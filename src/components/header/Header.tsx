import { useState } from "react";
import { imgurl } from "../../assets/img/img";

import axios from "axios";

const Header = () => {
  const [qu, setQu] = useState("");
  const [recipie, setRecipie] = useState([]);

  const YOUR_APP_ID = "848a45d2";
  const YOUR_APP_KEY = "72e384d6cba5eb6d376f4771bad12189	";

  const fetchRecipies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `https://api.edamam.com/search?q=${qu}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    const result = await axios.get(url);

    console.log(result.data);
    setRecipie(result.data.hits);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${imgurl})` }}
        className=" bg-gray-100 w-full h-[500px] flex flex-wrap justify-center items-center> "
      >
        <div className="container mx-auto py-4">
          <h1 className="text-4xl font-bold mb-4">Food <span className="text-red-600">Recipie</span></h1>

          <form
            className="flex gap-4 w-auto h-auto"
            onSubmit={(e) => fetchRecipies(e)}
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) => setQu(e.target.value)}
            />

            <button className="bg-blue-500 w-[120px] rounded ">Submit</button>
          </form>
        </div>
      </div>
      <div className="w-full h-auto flex flex-wrap justify-center items-center gap-2  pt-5 ">
        {recipie.map((recipe: any) => (
          <div className="wrapper">
            <div className="card">
              <div className="front w-[200px] h-[320px] border rounded-md shadow-lg cursor-pointer mx-2 my-4 text-center">
                <img
                  src={recipe.recipe.image}
                  alt={recipe.recipe.label}
                  className="w-64 h-40 object-cover rounded-t-md"
                />
                <p className="text-lg font-bold mt-2 ">{recipe.recipe.label}</p>
              </div>
              <div className="back overflow-y-auto bg-gray-200 w-[200px] h-[320px] border rounded-md shadow-lg cursor-pointer mx-2 my-4 ">
                <ul className="list-disc list-inside">
                <li className="text-lg font-bold mt-2 ">{recipe.recipe.ingredientLines}</li>
                  <li className="text-lg font-bold mt-2 ">{recipe.recipe.calories}</li>

                </ul>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
