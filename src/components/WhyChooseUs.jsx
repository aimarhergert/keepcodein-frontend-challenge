import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFeature } from "../features/whyChooseUs/whyChooseUsSlice";

const FeatureCard = ({ feature, active, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(feature.id)}
      className={`text-left p-6 rounded-xl border transition-all duration-200 ${
        active
          ? "border-[#6318F1] bg-gradient-to-br from-[#6318F1]/30 to-[#3F5EFB]/20 shadow-xl scale-[1.02]"
          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
          active ? "bg-[#6318F1] text-white" : "bg-white/10 text-gray-300"
        }`}
      >
        {feature.title.charAt(0)}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
    </button>
  );
};

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const { features, activeFeatureId } = useSelector((state) => state.whyChooseUs);

  return (
    <div id="why-choose-us" className="container mx-auto px-6 lg:px-32 py-16">
      <div className="flex flex-col justify-center items-center text-white gap-y-3">
        <h1 className="text-3xl font-semibold text-center">Why Choose Us</h1>
        <p className="max-w-xl text-center text-gray-400">
          The reasons teams trust us with their most important builds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            active={feature.id === activeFeatureId}
            onSelect={(id) => dispatch(setActiveFeature(id))}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
