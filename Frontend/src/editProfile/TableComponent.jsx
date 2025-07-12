import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";

const TableComponent = ({data}) => {

  
  return (
    <div>
      <table className="w-[34em]">
        <tbody>
          {data.map((value, i) => (
            <tr key={i} className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">{value.name}</h4>
                    <p className="text-[15px] text-slate-500 -mt-1">
                      {value.character}
                    </p>
                  </div>
                  <FaEdit color="#F24822" size={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent