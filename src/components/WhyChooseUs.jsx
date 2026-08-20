import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUserTie,
  FaBolt,
  FaUsers,
  FaShieldHalved,
} from "react-icons/fa6";
import { setActiveFeature } from "../features/whyChooseUs/whyChooseUsSlice";

const FEATURE_ICONS = {
  "senior-engineers": FaUserTie,
  "fast-delivery": FaBolt,
  "scalable-teams": FaUsers,
  "secure-by-design": FaShieldHalved,
};

const FeatureCard = ({ feature, index, active, onSelect }) => {
  const Icon = FEATURE_ICONS[feature.id];
  return (
    <button
      onClick={() => onSelect(feature.id)}
      className={`relative group text-left overflow-hidden rounded-2xl p-6 border transition-all duration-300 ${
        active
          ? "border-[#6318F1]/70 bg-gradient-to-br from-[#6318F1]/25 via-transparent to-[#3F5EFB]/15 shadow-[0_20px_60px_-15px_rgba(99,24,241,0.45)] -translate-y-1"
          : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
      }`}
    >
      <span className="absolute right-4 top-3 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-300">
        0{index + 1}
      </span>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-all duration-300 ${
          active
            ? "bg-gradient-to-br from-[#6318F1] to-[#3F5EFB] text-white shadow-lg"
            : "bg-white/10 text-gray-300 group-hover:bg-[#6318F1]/30 group-hover:text-white"
        }`}
      >
        <Icon />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
      {active && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#C4B5FD]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#59D3AA] animate-pulse" />
          Selected feature
        </span>
      )}
    </button>
  );
};

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const { features, activeFeatureId } = useSelector((state) => state.whyChooseUs);

  return (
    <div id="why-choose-us" className="container mx-auto px-6 lg:px-32 py-16">
      <div className="flex flex-col justify-center items-center text-white gap-y-3">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#8B7CF6]" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7CF6]">
            Why us
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#8B7CF6]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Why{" "}
          <span className="bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
            Choose Us
          </span>
        </h1>
        <p className="max-w-xl text-center text-gray-400">
          The reasons teams trust us with their most important builds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            active={feature.id === activeFeatureId}
            onSelect={(id) => dispatch(setActiveFeature(id))}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
