/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function TeacherPerformance() {
  return (
    <div className="bg-white py-4 rounded-lg grid px-6 w-[60%] border border-border-colour-light">
      <h3 className="text-Text-high-emphasis text-lg font-semibold ">
        Teacher Performance
      </h3>
      <p className="text-sm text-Text-meduim-emphasis">
        Ratings of teachers’ performance
      </p>
      <div className="max-h-64 overflow-scroll pr-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="flex mt-6 justify-between" key={i}>
            <div className="flex gap-4 items-center">
              <div className="w-[36px] relative h-[36px] rounded-full overflow-hidden">
                <Image
                  src="/joebrendan.png"
                  alt="unsplashh image as avatar"
                  fill
                />
              </div>
              <div className="space-y-1">
                <h5 className="text-Text-high-emphasis text-lg font-semibold ">
                  Jenny Wilson
                </h5>
                <p className="text-sm text-Text-meduim-emphasis">
                  w.lawson@example.com
                </p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <span className="font-medium text-Text-high-emphasis text-sm">
                4.5
              </span>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
        ))}
      </div>
      <button className="text-Text-low-emphasis font-semibold gap-4 flex items-center pt-2">
        <span>SEE ALL TEACHERS</span>
        <Icon icon="material-symbols:arrow-forward-ios" />
      </button>
    </div>
  );
}
