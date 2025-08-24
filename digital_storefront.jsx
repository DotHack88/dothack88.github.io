import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Moon, Sun } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [products] = useState([
    {
      id: 1,
      name: "Adobe Photoshop",
      price: "€19.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    },
    {
      id: 2,
      name: "Cyberpunk 2077",
      price: "€59.99",
      image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    },
    {
      id: 3,
      name: "Xbox Game Pass",
      price: "€14.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Xbox_Game_Pass.png",
    },
  ]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 font-sans">
        {/* Top Bar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <div className="flex space-x-6">
            <a href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">Home</a>
            <a href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">Contatti</a>
            <a href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">Info</a>

            {/* Dropdown Menu */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600">
                Prodotti
                <ChevronDown className="ml-1 h-4 w-4" />
              </MenuButton>
              <MenuItems className="absolute left-0 mt-2 w-56 origin-top-left rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="p-2">
                  <MenuItem>
                    {({ active }) => (
                      <div className={`${active ? "bg-gray-100 dark:bg-gray-700" : ""} rounded-md px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200`}>PlayStation</div>
                    )}
                  </MenuItem>
                  <div className="ml-6 text-sm text-gray-600 dark:text-gray-400">Giochi</div>
                  <div className="ml-6 text-sm text-gray-600 dark:text-gray-400 mb-2">Abbonamenti</div>

                  <MenuItem>
                    {({ active }) => (
                      <div className={`${active ? "bg-gray-100 dark:bg-gray-700" : ""} rounded-md px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200`}>Software</div>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>

        {/* Slider orizzontale */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">In evidenza</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <div key={product.id} className="min-w-[200px] bg-white dark:bg-gray-800 shadow rounded-2xl p-4 flex-shrink-0">
                <img src={product.image} alt={product.name} className="h-32 w-full object-contain mb-2" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.price}</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl">Acquista</button>
              </div>
            ))}
          </div>
        </div>

        {/* Sezione Prodotti */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Prodotti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 flex flex-col items-center">
              <span className="text-5xl mb-2">🎮</span>
              <h3 className="text-xl font-semibold">PlayStation</h3>
              <p className="text-gray-600 dark:text-gray-300">Giochi, Abbonamenti</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 flex flex-col items-center">
              <span className="text-5xl mb-2">💻</span>
              <h3 className="text-xl font-semibold">Software</h3>
              <p className="text-gray-600 dark:text-gray-300">Applicazioni e tools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
