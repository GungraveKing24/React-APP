import ModalCategories from "./ModalCategories";

export default function CategoryCard({ category, toastEvent, setCategories }) {
  return (
    <div className="group relative block overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-Title text-gray-900">{category.name_cat}</h3>

        <div className="flex space-x-4 mt-4">
          <ModalCategories category={category} toastEvent={toastEvent} setCategories={setCategories}/>
        </div>
      </div>
    </div>
  );
}
