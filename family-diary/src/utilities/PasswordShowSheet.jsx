import React from "react";
import { PasswordStrength } from "./PasswordStrength";
import Requirement from "../component/forms/PasswordRequirement";

const PasswordShowSheet = ({password}) => {
    const {checks, strength} = PasswordStrength(password)
  return (
    <div>
      <div
        className="
                            absolute
                            top-14
                            left-0
                            w-full
                            bg-white
                            border border-gray-200
                            rounded-xl
                            shadow-lg
                            p-3
                            z-30
                            animate-slide-up
                          ">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Password Strength
          </p>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`h-1.5 flex-1 rounded-full ${
                  strength >= item
                    ? strength <= 2
                      ? "bg-red-500"
                      : strength <= 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

              <div className="space-y-1 text-xs">
          <Requirement met={checks.length} text="8+ characters" />

          <Requirement met={checks.uppercase} text="Uppercase letter" />

          <Requirement met={checks.lowercase} text="Lowercase letter" />

          <Requirement met={checks.number} text="Number" />

          <Requirement met={checks.special} text="Special character" />
        </div>
      </div>
    </div>
  );
};

export default PasswordShowSheet;
