import React from "react";

function CalendarTest() {
  const year = 2026;
  const month = 3; // กุมภาพันธ์ (0=มกราคม)
  const days = getDaysArray(year, month);

  return (
    <div>
      <section className="relative bg-stone-50">
        <div className="flex items-center justify-between">
          <div className="w-7xl border border-indigo-200 rounded-xl mr-4 ml-30">
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
            {/* <div className="grid grid-cols-7">
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50">
                <span className="text-xs font-semibold text-gray-500">27</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">28</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">29</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">30</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">31</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">1</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">2</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">3</span>
              </div>
              <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                <span className="text-xs font-semibold text-gray-500">4</span>
              </div>
            </div> */}
            <div className="grid grid-cols-7">
              {days.map((d, idx) => (
                <div
                  key={idx}
                  className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50
            ${d.type === "current" ? "bg-gray-50 text-gray-800" : "bg-gray-100 text-gray-400"}
          `}
                >
                  <span className="text-xs font-semibold">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-red-500">Calendar</h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CalendarTest;

function getDaysArray(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, ...
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Days from previous month
  const prevDays = Array.from(
    { length: startDay },
    (_, i) => prevMonthDays - startDay + i + 1,
  );

  // Days in current month
  const thisDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Days from next month to fill 6 rows
  const totalCells = 42; // 6 weeks x 7 days
  const nextDays = Array.from(
    { length: totalCells - (prevDays.length + thisDays.length) },
    (_, i) => i + 1,
  );

  return [
    ...prevDays.map((d) => ({ day: d, type: "prev" })),
    ...thisDays.map((d) => ({ day: d, type: "current" })),
    ...nextDays.map((d) => ({ day: d, type: "next" })),
  ];
}
