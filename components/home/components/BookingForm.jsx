"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import CitiesInput from "./components/CitiesInput";
import CategoriesInput from "./components/CategoriesInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import { useRouter } from "next/navigation";
const encodeData = (obj) => {
  return encodeURIComponent(JSON.stringify(obj));
};
export default function BookingForm({ setShowTrips }) {
  const { theme } = useTheme();

  const [showCities, setShowCities] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  const toggleCity = (city) =>
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  const confirmCities = () => setShowCities(false);

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { cities, categories, loading } = useCitiesCategories(); // ✅ جلب البيانات من الكونتكست
  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  const confirmCategories = () => setShowCategories(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // أول مرة
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // منطق التحكم في القيم حسب حجم الشاشة
  let rightValue = screenSize.width * 0.19;
  let topValue = 0;

  if (screenSize.width >= 1575) {
    // موبايل
    rightValue = screenSize.width * 0.2;
    topValue = 0;
  } else if (screenSize.width >= 1000) {
    // تابلت
    rightValue = screenSize.width * 0.36;
    topValue = 0;
  }
  const [arrival, setArrival] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const specialDates = [];
  const router = useRouter();

  const handleClick = () => {
    const queryObj = {
      city: selectedCities.map((c) => c.displayName), // ✅ المدن المختارة
      category: selectedCategories.map((c) => c.displayName), // ✅ الكاتيجريز المختارة
      price: "All", // ✅ ثابت
      popular: false, // ✅ ثابت
    };

    const encoded = encodeData(queryObj);
    router.push(`/trips?data=${encoded}`);
  };
  const CustomInput = ({ value, onClick }) => (
    <div
      onClick={onClick}
      className={`flex w-[325px] items-center rounded-[14px] px-6 cursor-pointer 
                  backdrop-blur-md border ${theme.logoBorder} shadow-md hover:shadow-lg 
                  transition-all duration-300 relative overflow-hidden `}
    >
      <FaCalendarAlt className={`mr-3 text-xl ${theme.iconHover}`} />
      <span className={`flex-1 p-2 tracking-wide font-medium ${theme.text}`}>
        {value || "Select Date"}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(194,168,120,0.15)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className={`mt-6  shadow-lg flex flex-col flex-wrap gap-4 w-[80%] max-w-4xl p-6 
                  backdrop-blur-md border ${theme.logoBorder} rounded-xl relative`}
    >
      <div className="flex flex-row flex-wrap gap-5 flex-1">
        {/* Cities */}
        <div
          className={`flex items-center flex-1 border ${theme.logoBorder} rounded-[14px] px-3 relative `}
        >
          <CitiesInput
            selectedCities={selectedCities}
            confirmSelection={confirmCities}
            setShowCities={setShowCities}
            toggleCity={toggleCity}
            showCities={showCities}
            cities={cities}
            topValue={topValue}
            rightValue={rightValue}
          />
        </div>

        {/* Categories */}
        <div
          className={`flex items-center flex-1 border ${theme.logoBorder} rounded-[14px] px-3 relative`}
        >
          <CategoriesInput
            selectedCategories={selectedCategories}
            confirmSelection={confirmCategories}
            setShowCategories={setShowCategories}
            toggleCategory={toggleCategory}
            showCategories={showCategories}
            categories={categories}
            topValue={topValue}
            rightValue={rightValue}
          />
        </div>

        {/* Arrival Date */}
        <div className="flex-1 max-w-[120px] xl:min-w-[325px] flex flex-col z-[1]">
          <DatePicker
            selected={arrival}
            onChange={(date) => {
              setArrival(date);
              setStartDate(date);
            }}
            onCalendarOpen={() => setShowTrips(true)} // ✅ إظهار الكروت عند فتح الجدول
            onCalendarClose={() => setShowTrips(false)} // ✅ إخفاء الكروت عند إغلاق الجدول
            dateFormat="dd/MM/yyyy"
            placeholderText="Checkin"
            customInput={<CustomInput />}
            minDate={addDays(new Date(), 2)}
            dayClassName={(day) => {
              const special = specialDates.find(
                (item) => item.date.toDateString() === day.toDateString(),
              );
              return special ? "special-day" : "";
            }}
          />
        </div>

        {/* Departure Date */}
        <div className="flex-1 max-w-[120px] xl:min-w-[325px] flex flex-col z-50">
          <DatePicker
            selected={departure}
            onChange={(date) => setDeparture(date)}
            onCalendarOpen={() => setShowTrips(true)} // ✅ إظهار الكروت عند فتح الجدول
            onCalendarClose={() => setShowTrips(false)} // ✅ إخفاء الكروت عند إغلاق الجدول
            minDate={startDate ? addDays(startDate, 7) : addDays(new Date(), 4)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Checkout"
            customInput={<CustomInput />}
          />
        </div>
      </div>

      {/* زر الحجز */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick} // ✅ ربط الدالة
        className={`w-full rounded-[6px] px-6 py-3 font-semibold tracking-wide cursor-pointer 
              transition-all duration-300 shadow-lg ${theme.buttonPrimary}`}
        style={{
          color: `${theme.subText}`,
          border: `2px solid ${theme.logoBorder}`,
        }}
      >
        EXPERIENCE THE LEGEND
      </motion.button>
    </motion.div>
  );
}
