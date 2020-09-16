import React from "react";

type Props = {
  title: string;
  text: string;
};

export default function Post({ title, text }: Props) {
  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="bg-indigo-300 h-32" />

      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <div className="font-bold text-gray-500 text-sm">Aug 2nd, 2020</div>
          <div>LIKE BUTTON</div>
        </div>

        <div className="font-serif font-semibold text-2xl text-gray-900">
          {title}
        </div>

        <div className="text-gray-700 text-lg">{text}</div>

        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 bg-red-300 mr-4" />
          <div className="text-gray-900 font-semibold">VapeJuiceJordan</div>
        </div>
      </div>
    </div>
  );
}
