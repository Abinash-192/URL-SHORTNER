// import { useEffect, useState } from "react";

// export default function App() {
//   const [links, setLinks] = useState({});
//   const [url, setUrl] = useState("");
//   const [shortCode, setShortCode] = useState("");

//   const fetchLinks = async () => {
//     const res = await fetch("http://localhost:3000/api/links");
//     setLinks(await res.json());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3000/api/shorten", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url, shortCode }),
//       });
//       if (!res.ok) {
//         alert(await res.text());
//         return;
//       }
//       await fetchLinks();
//       setUrl("");
//       setShortCode("");
//       alert("URL shortened successfully!");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold mb-1">Enter URL:</label>
//             <input
//               type="url"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Enter Short Code:</label>
//             <input
//               type="text"
//               value={shortCode}
//               onChange={(e) => setShortCode(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Shorten
//           </button>
//         </form>

//         <h2 className="text-xl font-semibold mt-6 mb-2">Shortened URLs</h2>
//         <ul className="space-y-2">
//           {Object.entries(links).map(([code, link]) => (
//             <li
//               key={code}
//               className="bg-gray-200 p-2 rounded break-all text-sm"
//             >
//               <a
//                 href={`/${code}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600"
//               >
//                 {window.location.origin}/{code}
//               </a>{" "}
//               - {link}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// export default function App() {
//   const [links, setLinks] = useState({});
//   const [url, setUrl] = useState("");
//   const [shortCode, setShortCode] = useState("");

//   const fetchLinks = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/links");
//       if (!res.ok) throw new Error("Failed to fetch links");
//       const data = await res.json();
//       setLinks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/shorten", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url, shortCode }),
//       });
//       if (!res.ok) {
//         alert(await res.text());
//         return;
//       }
//       await fetchLinks();
//       setUrl("");
//       setShortCode("");
//       alert("URL shortened successfully!");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
//           URL Shortener
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold mb-1">Enter URL:</label>
//             <input
//               type="url"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">
//               Enter Short Code (optional):
//             </label>
//             <input
//               type="text"
//               value={shortCode}
//               onChange={(e) => setShortCode(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Shorten
//           </button>
//         </form>

//         <h2 className="text-xl font-semibold mt-6 mb-2">Shortened URLs</h2>
//         <ul className="space-y-2">
//           {Object.entries(links).map(([code, link]) => (
//             <li
//               key={code}
//               className="bg-gray-200 p-2 rounded break-all text-sm"
//             >
//               <a
//                 href={`http://localhost:5000/${code}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 {`http://localhost:5000/${code}`}
//               </a>{" "}
//               - {link}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

const BACKEND_URL = "https://url-shortner-1-gvxr.onrender.com";

export default function App() {
  const [links, setLinks] = useState({});
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/links`);
      if (!res.ok) throw new Error("Failed to fetch links");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Error fetching links:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortCode }),
      });

      if (!res.ok) {
        alert(await res.text());
        return;
      }

      await fetchLinks();
      setUrl("");
      setShortCode("");
      alert("URL shortened successfully!");
    } catch (err) {
      console.error("Error shortening URL:", err.message);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          URL Shortener
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Enter URL:</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Enter Short Code (optional):
            </label>
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Shorten
          </button>
        </form>

        <h2 className="text-xl font-semibold mt-6 mb-2">Shortened URLs</h2>
        <ul className="space-y-2">
          {Object.entries(links).map(([code, link]) => (
            <li
              key={code}
              className="bg-gray-200 p-2 rounded break-all text-sm"
            >
              <a
                href={`${BACKEND_URL}/${code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {`${BACKEND_URL}/${code}`}
              </a>{" "}
              - {link}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
