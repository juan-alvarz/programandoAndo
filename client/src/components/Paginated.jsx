import React from "react";

export const Paginated = ({
  setPagina,
  videos,
  videosPagina,
  paginaActual,
  prev,
  next,
}) => {
  const numeroPaginas = [];
  for (let i = 1; i <= Math.ceil(videos / videosPagina); i++) {
    numeroPaginas.push(i);
  }
  // console.log(numeroPaginas);
  return (
    <div>
      <nav>
        <ul className="inline-flex mt-10">
          <li>
            <button
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={prev}
            >
              Previous
            </button>
          </li>
          {numeroPaginas.map((numero, index) => {
            if (paginaActual === index + 1) {
              return (
                <li key={numero}>
                  <button
                    className="py-2 px-3 leading-tight text-gray-200 bg-gray-800 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setPagina(numero)}
                  >
                    {numero}
                  </button>
                </li>
              );
            } else {
              return (
                <li key={numero}>
                  <button
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setPagina(numero)}
                  >
                    {numero}
                  </button>
                </li>
              );
            }
          })}

          {numeroPaginas.length < 2 ? (
            <li>
              <button
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={next}
                disabled="false"
              >
                Next
              </button>
            </li>
          ) : (
            <li>
              <button
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={next}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
