import { Link } from "react-router-dom";

function CategoryCard({ category }){
    return (
        <div className="group relative block overflow-hidden border border-gray-200 rounded-lg shadow-md">
          <img
            src={category.img_url}
            alt={category.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
            <p className="text-gray-700 mt-2">{category.description}</p>
            
            <div className="flex space-x-4 mt-4">
                <Link to="/">
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600">
                        Editar
                    </button>
                </Link>
                <Link to="/">
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600">
                        Deshabilitar
                    </button>
                </Link>
            </div>
          </div>
        </div>
      );
}

function Categories(){
    const categories = [{id: 1, name: "categoria 1", description: "description 1"}, 
        {id: 2, name: "categoria 2", description: "description 2"}, 
        {id: 3, name: "categoria 3", description: "description 3"}, 
        {id: 4, name: "categoria 4", description: "description 4"}]

        console.log(categories)

    return (
        <>
        <div>
            <h2>Categorias</h2>
            <button>+</button>
        </div>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <SmartSpinner />
          )}
        </>
      );  
}

export default Categories