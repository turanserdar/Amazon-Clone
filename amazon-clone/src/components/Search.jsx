import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react'
import { callAPI } from '../utils/CallApi'
import { useNavigate, createSearchParams } from 'react-router-dom'

const Search = () => {

    const [suggestions, setSuggestions] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] =useState("All");
    const navigate=useNavigate();

    const onHandleSubmit = (e) => { 

        e.preventDefault();

        // Using the navigate function, the user is directed to another page.
        // The path of the new page is determined as "search".
        navigate({

            pathname:"search",
            search:`${
                // The query parameters of the new page are created using the create Search Params function.                createSearchParams({

                    createSearchParams({
                    category:`${category}`,
                    searchTerm:`${searchTerm}`
                })
            }`

        })
        // This line uses the setSearchTerm function to set the searchTerm state to an empty string (""). This is done to reset the search term after the form is submitted.
            setSearchTerm("");
            // This line uses the setCategory function to set the category state to "All". This is done to reset the category selection after the form is submitted.
            setCategory("All");
     };


    const getSuggestions = () => {
        callAPI(`data/suggestions.json`).then((suggestionResults) => {
            setSuggestions(suggestionResults);
        });
    };

    useEffect(() => {
        getSuggestions();
    }, []);


    return (
        <div className='w-[100%]'>
            <div className='flex items-center h-10 bg-amazonclone-yellow rounded'>
                <select  onChange={(e) => setCategory(e.target.value)} className='p-2 bg-gray-300 text-black border text-xs xl:text-sm'>
                    <option>
                        All
                    </option>
                    <option>
                        Deals
                    </option>
                    <option>
                        Amazon
                    </option>
                    <option>
                        Fashion
                    </option>
                    <option>
                        Computers
                    </option>
                    <option>
                        Home
                    </option>

                    <option>
                        Mobiles
                    </option>

                </select>

                <input
                    className="flex grow items-center h-[100%] rounded-l text-black"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={onHandleSubmit} className='w-[45px]'>
                    <MagnifyingGlassIcon className="h-[27px] m-auto stroke-slate-900" />

                </button>
            </div>
            {suggestions && (
        <div className="bg-white text-black w-full z-40 absolute">
          {suggestions
            .filter((suggestion) => {
              const currentSearchTerm = searchTerm.toLowerCase();
              const title = suggestion.title.toLowerCase();
              return (
                currentSearchTerm &&
                title.startsWith(currentSearchTerm) &&
                title !== currentSearchTerm
              );
            })
            .slice(0, 10)
            .map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => setSearchTerm(suggestion.title)}
              >
                {suggestion.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;