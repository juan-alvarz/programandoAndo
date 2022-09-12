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
    <div >
      <nav>
        <ul className="flex">
          <li>
            <button
              style={{width: 70}}
              className="py-1 px-2 ml-0 text-sm text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
                    style={{backgroundColor: 'rgb(17, 52, 82)'}}
                    className="pb-1 px-2 text-gray-200 bg-gray-900 border border-gray-300 hover:bg-gray-100 hover:text-gray-400"
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
                    className="py-1 px-2 text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
                style={{width: 70}}
                className="py-1 px-2 text-sm text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={next}
                disabled="false"
              >
                Next
              </button>
            </li>
          ) : (
            <li>
              <button
                style={{width: 70}}
                className="py-1 px-2 text-sm text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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