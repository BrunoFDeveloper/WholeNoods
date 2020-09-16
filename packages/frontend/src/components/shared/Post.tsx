import React from "react";

export default function Post() {
  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="bg-indigo-300 h-32" />

      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <div className="font-bold text-gray-500 text-sm">Aug 2nd, 2020</div>
          <div>LIKE BUTTON</div>
        </div>

        <div className="font-serif font-semibold text-2xl text-gray-900">
          Newest Food Pics
        </div>

        <div className="text-gray-700 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nulla
          aliquet porttitor lacus luctus accumsan tortor. Accumsan in nisl nisi
          scelerisque eu ultrices vitae auctor eu.
        </div>

        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 bg-red-300 mr-4" />
          <div className="text-gray-900 font-semibold">VapeJuiceJordan</div>
        </div>
      </div>
    </div>
  );
}
