"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Image, Popover, Tabs } from "antd";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import { getProjects, getSkills } from "@/data";

function Skill() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const t = useTranslations("skill");
  const skills = useMemo(() => getSkills(t), [t]);
  const projects = useMemo(() => getProjects(t), [t]);

  const projectCard = (project: any) => (
    <div className="overflow-hidden relative p-4 shadow-[0_0_4px_gray] rounded-xl group !bg-black border-2 border-[theme(--primary-light)] h-full h-full">
      <div className="relative z-20 flex flex-col gap-2.5 ">
        <Image.PreviewGroup items={project.gallery}>
          <Image
            className="w-full aspect-square relative overflow-hidden rounded-md"
            src={project.image}
            alt={project.name}
          />
        </Image.PreviewGroup>
        <Link
          href={project.href}
          className="text-lg font-bold text-white line-clamp-2 "
        >
          {project.name}
        </Link>
        <Popover
          placement="top"
          content={
            <div className="w-[300px]">
              <Link
                href={project.href}
                className="text-lg font-bold bg-amber-600"
              >
                {project.name}
              </Link>
              <p
                className="text-justify overflow-y-auto max-h-[245px] scroll-visible"
                dangerouslySetInnerHTML={{
                  __html: project.description,
                }}
              />
            </div>
          }
        >
          <p className="text-base text-justify line-clamp-3 font-light text-white cursor-pointer ">
            {project.description}
          </p>
        </Popover>
        <div className="w-full flex gap-2 flex-wrap">
          {project.technologies.map((t: string, iT: number) => (
            <p
              key={iT}
              className="px-2 py-1 text-xs font-bold rounded border border-blue-500"
            >
              {t}
            </p>
          ))}
        </div>
      </div>
      <span className="z-10 absolute w-1/2 h-full top-0 left-0 rotate-45 -translate-1/2 group-hover:top-[100%] group-hover:left-[100%] bg-blue-800 blur-xl transition-all duration-700" />
    </div>
  );

  return (
    <section id="skills" className="min-h-screen center-flex pt-20 ">
      <Tabs
        className="w-full min-h-[80vh] [&_.ant-tabs-nav::before]:hidden [&_.ant-tabs-ink-bar]:!bg-[theme(--primary-light)]"
        defaultActiveKey="1"
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        style={{ color: "white" }}
        items={[
          {
            key: "1",
            label: (
              <h2 className="text-white text-2xl font-bold">{t("skills")}</h2>
            ),
            children: (
              <div
                data-aos="fade-up"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8 pt-5 "
              >
                <AnimatePresence>
                  {skills.map((skill: any, index: number) => {
                    return (
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.05,
                        }}
                        key={`${activeTabKey}-${index}`}
                        className="relative flex px-4 py-3 gap-4 items-center border-white rounded-lg overflow-hidden group bg-blue-500/20 select-none"
                      >
                        <div className="z-20 w-1/4 shrink-0 aspect-square rounded-lg flex items-center justify-center">
                          <skill.icon className="w-[90%] shrink-0 " />
                        </div>
                        <div className="z-20 w-full h-full relative flex flex-col transition-all overflow-hidden">
                          <p className="absolute left-0 top-1/2 -translate-y-1/2 group-hover:-translate-y-full transition-all duration-300 text-xl font-bold line-clamp-1">
                            {skill.name}
                          </p>
                          <p className="absolute left-0 top-full group-hover:top-1/2 transition-all duration-500 text-md font-medium line-clamp-1">
                            {skill.level}
                          </p>
                        </div>
                        <span className="z-10 absolute w-full translate-1/2 group-hover:-translate-1/3 blur-2xl aspect-square bg-blue-800 shadow-[0_0_20px_#1c398e] transition-all duration-500"></span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <h2 className="text-white text-2xl font-bold">{t("projects")}</h2>
            ),
            children: (
              <>
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 pt-5">
                  <AnimatePresence>
                    {projects.map((project: any, index: number) => (
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        key={`${activeTabKey}-${index}`}
                      >
                        {projectCard(project)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="!flex sm:!hidden !px-6 !h-full"
                >
                  {projects.map((project: any, index: number) => (
                    <SwiperSlide key={index}>
                      {projectCard(project)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ),
          },
        ]}
      />
    </section>
  );
}

export default Skill;
