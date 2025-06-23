"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TypeIt from "typeit";
import "aos/dist/aos.css";
import AOS from "aos";
import { IoMail } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaGithub, FaPhone } from "react-icons/fa6";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Popover, Tabs } from "antd";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

import { projects, skills } from "@/data";
import images from "@/assets/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ModalNotification from "@/components/ModalNotification";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({
    status: null,
    message: "",
  });
  const [activeTabKey, setActiveTabKey] = useState("1");

  const el = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Cho phép animate lại khi cuộn lên
    });

    if (!el.current) return;
    const instance = new TypeIt(el.current, {
      speed: 100,
      deleteSpeed: 50,
      loop: true,
      breakLines: false,
      waitUntilVisible: true,
    })
      .type("Web Developer")
      .pause(1200)
      .delete()
      .type("Front End Developer")
      .pause(1200)
      .delete()
      .go();

    return () => {
      instance.destroy();
    };
  }, []);

  const validationSchema = useMemo(() => {
    Yup.object().shape({
      name: Yup.string()
        .matches(
          /^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐĨŨƠƯỲỴÝỶỸẰẮẲẴẶẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆÔỒỐỔỖỘƠỜỚỞỠỢƯỪỨỬỮỰ]+[a-zàáâãèéêìíòóôõùúýăđĩũơưỳỵỷỹằắẳẵặấầẩẫậèéẹẻẽêềếểễệôồốổỗộơờớởỡợưừứửữự]+(?:\s+)?)+$/,
          "Họ tên không hợp lệ. Vui lòng viết đúng định dạng (có dấu, viết hoa đầu mỗi chữ)."
        )
        .required("Vui lòng nhập Họ và Tên"),

      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email của bạn"),
      message: Yup.string().required("Vui lòng nhập tin nhắn cho tôi"),
    });
  }, []);

  const handleSubmit = useCallback(
    (values: any, { resetForm }: { resetForm: () => void }) => {
      setLoading(true);
      fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "Khangdao0311@gmail.com",
          subject: "Contact from Portfolio",
          html: `<main>
                <p>Name: ${values.name}</p>
                <p>Email: ${values.email}</p>
                <p>Message: ${values.message}</p>
              </main>`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setNotification({
            status: true,
            message: "I received your message! I will reply you later.",
          });
          resetForm();
        })
        .catch((err) => {
          setLoading(false);
          setNotification({
            status: false,
            message: "Error sending message: " + err,
          });
        })
        .finally(() => {
          setTimeout(() => {
            setNotification({ status: null, message: "" });
          }, 2500);
        });
    },
    []
  );

  return (
    <>
      {loading && <Loading />}
      <ModalNotification notification={notification} />
      <Header />
      <main className="container-custom px-2.5 xl:px-0">
        {/* HOME */}
        <section
          id="home"
          className="min-h-screen flex flex-col md:flex-row gap-10 md:gap-5 items-center justify-around pt-20 "
        >
          <div data-aos="fade-right" className=" flex flex-col gap-6">
            <p className="text-white text-3xl font-bold">Hello ! 👋</p>
            <p className=" text-4xl font-bold text-white">I'm DAO VINH KHANG</p>
            <p className="text-white text-3xl font-bold">
              a <span ref={el}></span>
            </p>
            <p className="text-white text-xl font-medium">
              Wellcome to my persanal website !
            </p>
            <div className="flex gap-4">
              <a
                className="overflow-hidden w-48 p-2 h-12 bg-black border-2 border-white text-white rounded-lg cursor-pointer relative z-10 group"
                href="/CV_FRONT-END_DEVELOPER.pdf"
                download
              >
                <span className="absolute w-52 h-32 -top-10 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                <span className="absolute w-52 h-32 -top-10 -left-2 bg-blue-800 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                <span className="absolute w-52 h-32 -top-10 -left-2 bg-blue-950 rotate-12 transform scale-x-0 group-hover:scale-x-60 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                <span className=" absolute center-fixed text-xl font-bold text-nowrap">
                  Download CV
                </span>
              </a>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="w-3/4 aspect-square rounded-full md:w-1/3 h-full center-flex group select-none"
          >
            <div className="relative center-flex bg-[radial-gradient(circle_at_center,_#000,_#162556)] w-3/4 aspect-[1/1] translate-y-1/6 rounded-full z-10 shadow-[0_0_20px_#FFF] border-4 border-white shadow-white">
              <img
                className="absolute bottom-0 w-full h-auto object-center rounded-full select-none"
                src={images.avatar}
                alt="Avatar"
              />
            </div>
          </div>
        </section>
        {/* ABOUT */}
        <section
          id="about"
          className="min-h-screen center-flex flex-col md:flex-row gap-10 pt-20"
        >
          <div
            data-aos="fade-down"
            data-aos-duration="1200"
            className="w-1/3 aspect-square hidden md:flex items-center justify-center rounded-lg overflow-hidden"
          >
            <img
              className="h-full w-auto object-cover"
              src={images.code}
              alt="code"
            />
          </div>
          <div
            data-aos="fade-left"
            className="flex-1 h-full p-5 sm:p-10 flex justify-center flex-col gap-4 bg-blue-950/10 rounded-2xl border border-white/35 shadow-[0px_0px_10px_#162556] md:shadow-[20px_20px_2px_#091934]"
          >
            <p className="text-xl">
              Hi ! My name is Dao Vinh Khang, born in 2004, graduated from FPT
              Polytechnic College with a major in Web Development.
            </p>
            <p className="text-lg text-justify">
              Currently, I am looking for an Fresher Front-End Developer
              position to have the opportunity to learn, practice and improve my
              professional knowledge and gradually develop into a Fullstack in
              the future.
              <br />
              <br />
              I am a cheerful, sociable, responsible person at work and always
              ready to learn new knowledge. I wish to work in a professional
              environment where I can apply the knowledge I have learned and
              develop practical skills, while contributing to the overall
              development of the team and the company.
              <br />
              <br />
              Although I have just graduated, I have 4 months of experience
              interning as a Front end developer at Tin Viet Software Solutions.
            </p>
          </div>
        </section>
        {/* SKILLS */}
        <section id="skills" className="min-h-screen center-flex pt-20 ">
          <Tabs
            className="w-full  min-h-[80vh] [&_.ant-tabs-nav::before]:hidden"
            defaultActiveKey="1"
            activeKey={activeTabKey}
            onChange={setActiveTabKey}
            style={{ color: "white" }}
            items={[
              {
                key: "1",
                label: (
                  <h2
                    data-aos="fade-down"
                    className="text-white text-2xl font-bold"
                  >
                    Skills
                  </h2>
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
                            // animate={{ y: 0, opacity: 1 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1,
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
                  <h2
                    data-aos="fade-down"
                    className="text-white text-2xl font-bold"
                  >
                    Projects
                  </h2>
                ),
                children: (
                  <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 pt-5"
                  >
                    <AnimatePresence>
                      {projects.map((project: any, index: number) => (
                        <motion.div
                          initial={{ y: 40, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.2,
                          }}
                          key={`${activeTabKey}-${index}`}
                          className="overflow-hidden relative p-4 shadow-[0_0_4px_gray] rounded-xl group !bg-blue-950/10"
                        >
                          <div className="flex flex-col gap-2.5 z-20">
                            <Link
                              href={project.href}
                              className="w-full aspect-square overflow-hidden rounded-md"
                            >
                              <img
                                className="w-full h-full object-fill rounded-md"
                                src={project.image}
                                alt={project.name}
                              />
                            </Link>
                            <Link
                              href={project.href}
                              className="text-lg font-bold text-white line-clamp-2 "
                            >
                              {project.name}
                            </Link>
                            <p className="text-base text-justify line-clamp-3 font-light text-white ">
                              {project.description}
                            </p>
                            <div className="w-full flex gap-2 flex-wrap">
                              {project.technologies.map(
                                (t: string, iT: number) => (
                                  <p
                                    key={iT}
                                    className="px-2 py-1 text-xs font-bold rounded border border-blue-500"
                                  >
                                    {t}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                          <span className="-z-10 absolute w-1/2 h-full top-0 left-0 rotate-45 -translate-1/2 group-hover:top-[100%] group-hover:left-[100%] bg-blue-800 blur-xl transition-all duration-700"></span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ),
              },
            ]}
          />
        </section>
        {/* CONTACT */}
        <section
          id="contact"
          className="min-h-screen center-flex flex-col lg:flex-row gap-20 pt-20"
        >
          <div data-aos="fade-right" className=" flex flex-col gap-10">
            <h2 className="text-4xl font-bold">Profile</h2>
            <div className="flex flex-col gap-10">
              <div className="flex gap-10 items-center">
                <IoMail className="w-10 h-10" />
                <span className="text-xl font-bold ">
                  khangdao0311@gmail.com
                </span>
              </div>
              <div className="flex gap-10 items-center">
                <FaPhone className="w-10 h-10" />
                <span className="text-xl font-bold ">0976 382 553</span>
              </div>
              <div className="flex gap-10 items-center">
                <FaMapMarkerAlt className="w-10 h-10" />
                <span className="text-xl font-bold ">
                  District 12, Ho Chi Minh City
                </span>
              </div>
              <a
                href="https://github.com/Khangdao0311"
                className="flex gap-10 items-center"
              >
                <FaGithub className="w-10 h-10" />
                <span className="text-xl font-bold ">
                  github.com/khangdao0311
                </span>
              </a>
            </div>
          </div>
          <div
            data-aos="zoom-in-down"
            className="w-full max-w-[500px] p-6 sm:p-10 border-4 border-blue-800 shadow-[0_0_10px_#FFF] rounded-xl bg-white/5"
          >
            <h2 className="text-3xl font-semibold text-white mb-4 text-center">
              Contact Me
            </h2>
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="block text-white mb-1" htmlFor="name">
                      Your Name
                    </label>
                    <Popover
                      placement="bottom"
                      content={
                        <div className="text-red-500 text-sm font-semibold">
                          {errors.name}
                        </div>
                      }
                      open={!!(errors.name && touched.name)}
                    >
                      <input
                        className="w-full px-4 py-2 rounded focus:outline-none ring-1 ring-white focus:ring-2 focus:ring-blue-800 transition duration-300"
                        placeholder="Enter your name"
                        type="text"
                        name="name"
                        value={values.name}
                        autoComplete="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-white mb-1" htmlFor="email">
                      Your Email
                    </label>
                    <Popover
                      placement="bottom"
                      content={
                        <div className="text-red-500 text-sm font-semibold">
                          {errors.email}
                        </div>
                      }
                      open={!!(errors.email && touched.email)}
                    >
                      <input
                        className="w-full px-4 py-2 rounded focus:outline-none ring-1 ring-white focus:ring-2 focus:ring-blue-800 transition duration-300"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        type="email"
                        value={values.email}
                        autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-white mb-1" htmlFor="message">
                      Your Message
                    </label>
                    <Popover
                      placement="bottom"
                      content={
                        <div className="text-red-500 text-sm font-semibold">
                          {errors.message}
                        </div>
                      }
                      open={!!(errors.message && touched.message)}
                    >
                      <textarea
                        className="w-full px-4 py-2 rounded focus:outline-none ring-1 ring-white focus:ring-2 focus:ring-blue-800 transition duration-300"
                        rows={4}
                        placeholder="Enter your message"
                        name="message"
                        id="message"
                        value={values.message}
                        autoComplete="message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                    </Popover>
                  </div>
                  <button className="mt-4 relative bg-slate-900 h-16 w-full text-center border-2 border-blue-600 text-white text-base font-bold rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-blue-800 hover:text-white p-3 before:absolute before:w-10 before:h-10 before:content[''] before:right-2 before:top-2 before:z-10 before:bg-indigo-500 before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-16 after:h-16 after:content[''] after:bg-blue-400 after:right-6 after:top-4 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-10 hover:before:-bottom-4 hover:before:blur hover:after:-right-6 hover:after:scale-110">
                    Send Message
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
