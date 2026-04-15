import React from "react";
import SkinQuiz from "../../components/ui/SkinQuiz";
import Newsletter from "@/components/ui/landingPage/Newsletter";
const SkinAlgorithmPage = () => {
  return (
    <div className="mx-auto my-5 px-6 lg:my-22 lg:px-[119px]">
      <SkinQuiz />

      <section className="mt-10">
        <Newsletter />
      </section>
    </div>
  );
};

export default SkinAlgorithmPage;
