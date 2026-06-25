"use client";
import { useTranslation } from "react-i18next";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import EgyptianBackground from "../layout/EgyptianBackground";
import SectionHeader from "./components/SectionHeader";
import Decor from "../layout/Decor";
import CategoriesList from "./components/CategoriesList";
import DividerWithIcon from "../layout/DividerWithIcon";

export default function CategoriesSection() {
  const { t, i18n } = useTranslation("home");
  const { categories, loading } = useCitiesCategories();
  const normalizedLang = i18n.language.split("-")[0];

  if (loading) return <p>Loading categories...</p>;
  if (!categories || categories.length === 0)
    return <p>No categories found.</p>;

  return (
    <section
      className="hidden container lg:flex w-full h-[80vh] relative bg-cover bg-center flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('/HomePageImage/421009550_cc929d60-b9e0-426e-84d8-74d70ab10d55.svg')",
      }}
    >
      <Decor pos={"top"} />

      <EgyptianBackground />
      <SectionHeader title={t("ExploreCategories")} />
        <DividerWithIcon />

      {/* لو حابب تعرض كل الكاتيجوريز ككروت */}
      <CategoriesList categories={categories} language={normalizedLang} />
      <Decor pos={"bottom"} />
    </section>
  );
}
