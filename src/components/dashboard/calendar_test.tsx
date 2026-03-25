"use client";

import React, { useState } from "react";

// utils
import { getDaysArray, pad } from "@/utils/calendar";

// icons
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

type Mockup = {
  id: number;
  name: string;
  date: string;
  count: number;
};

function CalendarTest() {
  const today = new Date();
  // const year = today.getFullYear();
  // const month = today.getMonth(); // ปัจจุบัน (0=มกราคม)
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const days = getDaysArray(year, month);
  console.log(days);

  const mockData: Mockup[] = [
    { id: 1, name: "Event A", date: "2026-03-05", count: 10 },
    { id: 2, name: "Event B", date: "2026-03-15", count: 20 },
    { id: 3, name: "Event C", date: "2026-03-25", count: 30 },
  ];

  const handlerPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  const handlerNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div>
      <section className="relative bg-stone-50 p-5">
        <div className="flex items-center justify-between gap-10">
          {/* Calendar Date select detail */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-5">
              <h1 className="font-semibold text-xl text-gray-700">Details</h1>
            </div>
            <div className="w-full border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500">Selected Date:</span>
                <span className="text-sm font-medium text-gray-800">
                  {`${year}-${pad(month + 1)}-${pad(today.getDate())}`}
                </span>
              </div>
              </div>
          </div>
          {/* Calendar container */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-5">
              <h5 className="text-gray-900 text-2xl font-semibold">
                {new Date(year, month).toLocaleString("en-US", { month: "long" })} {year}
              </h5>
              <div className="flex items-center space-x-2">
                <button onClick={handlerPrevMonth}>
                  <MdOutlineKeyboardArrowLeft className="w-7 h-7 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded cursor-pointer" />
                </button>
                <button onClick={handlerNextMonth}>
                  <MdOutlineKeyboardArrowRight className="w-7 h-7 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="w-7xl border border-indigo-200 rounded-xl mr-4">
              {/* Calendar header */}
              <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                <div className="py-3.5 border-r rounded-tl-xl border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Sun
                </div>
                <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Mon
                </div>
                <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Tue
                </div>
                <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Wed
                </div>
                <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Thu
                </div>
                <div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Fri
                </div>
                <div className="py-3.5 border-l border-indigo-200 rounded-tr-xl bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
                  Sat
                </div>
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {days.map((d, idx) => {
                  const events = mockData.filter(
                    (event) => event.date === d.date,
                  );
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col xl:aspect-square max-xl:min-h-[60px] p-3.5 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50
                  ${d.type === "current" ? "bg-gray-50 text-gray-800  cursor-pointer" : "bg-gray-100 text-gray-400"} 
                  ${d.date === today ? "bg-green-50 text-green-700 font-semibold" : ""}`}
                    >
                      {/* date */}
                      <span className="text-md font-semibold">{d.day}</span>

                      {/* Event Cards */}
                      <div>
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="rounded-md px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium truncate cursor-pointer hover:bg-emerald-200 transition-colors"
                          >
                            {event.name}
                            <div className="text-emerald-700 font-normal">
                              {event.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CalendarTest;
