/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@iconify/react";

export default function Home() {
  const date = new Date();
  return (
    <div className="font-GTWalsheimPro">
      <HeadingSection />
      <MainSection />
      <FooterSection date={date} />
    </div>
  );
}

function FooterSection({ date }: { date: Date }) {
  return (
    <footer>
      <div className="bg-neutral-100 py-10">
        <Container>
          <section className="flex justify-between">
            <div className="">
              <Image
                src="/Ascend-Logo.svg"
                alt="Vercel Logo"
                width={100}
                height={24}
                priority
              />
              <p className="max-w-sm text-gray-600 mt-8">
                Transforming school administration into a streamlined and
                hassle-free process.
              </p>
            </div>
            <div className="">
              <h4 className="text-gray-500 mb-3">Company</h4>
              <ul>
                {["About us", "Careers", "Solutions", "Contact"].map((item) => (
                  <li key={item} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h4 className="text-gray-500 mb-3">Social</h4>
              <ul>
                {["Twitter", "Instagram", "LinkedIn"].map((item) => (
                  <li key={item} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h4 className="text-gray-500 mb-3">Legal</h4>
              <ul>
                {["Terms", "Privacy", "Licenses", "Media kit"].map((item) => (
                  <li key={item} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Container>
      </div>
      <div className="bg-grey-50 py-5">
        <Container>
          <div className="flex items-center justify-between">
            <p>
              © {date.getFullYear()} AscendTechnologies. All rights reserved.
            </p>
            <div className="flex gap-2">
              <Icon
                icon="ri:twitter-fill"
                className="text-gray-400"
                fontSize={30}
              />
              <Icon
                icon="mdi:linkedin"
                className="text-gray-400"
                fontSize={30}
              />
              <Icon
                icon="fa6-brands:facebook"
                className="text-gray-400"
                fontSize={30}
              />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function MainSection() {
  return (
    <section className="bg-bgColour-variant-1 mt-16">
      <Container>
        <div className="text-center">
          <h3 className="text-5xl font-bold tracking-tighter text-accent-200">
            Why our clients choose Ascend
          </h3>
          <p className="mt-5 text-accent-300 text-opacity-60">
            Invoicing, bill pay, and cash flow control for freelancers and small
            businesses.
          </p>

          <div className="flex text-left flex-wrap gap-10 mt-24 justify-center">
            {[
              {
                img: "/customizable-report.svg",
                title: "Customizable Reports",
                text: "You can easily generate customized reports that provide valuable insights into your school's finances, staff management and meet your specific requirements.",
              },
              {
                img: "/data-storage.svg",
                title: "Secure Data Storage",
                text: "Ascend prioritizes the security and confidentiality of your school's data by ensuring that all data is encrypted and stored securely. ",
              },
              {
                img: "/payroll-system.svg",
                title: "Automated Payroll System",
                text: "Say goodbye to manual calculations and tedious paperwork. Ascend automates the payroll process hence solving payment complexities with ease.",
              },
            ].map((item) => (
              <div
                className="max-w-[360px] space-y-6 border p-5 rounded-md"
                key={item.title}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={24}
                  height={24}
                  priority
                />

                <h4 className="text-2xl text-accent-400 font-bold">
                  {item.title}
                </h4>
                <p className="text-accent-500 ">{item.text}</p>
              </div>
            ))}
          </div>
          <ContentSection
            heading="Effortlessly handle school administration"
            button={
              <button className="bg-primary-purple-500 text-grey-100 border-2 px-14 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
                Book a free demo
              </button>
            }
          />
          <ContentSection
            direction="lg:flex-row-reverse"
            heading="Disburse staff payment effectively"
            button={
              <button className="bg-primary-purple-500 text-grey-100 border-2 px-14 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
                Explore our solutions
              </button>
            }
          />
          <section className="flex border border-accent-300 justify-between p-10 items-center rounded-lg mt-10 max-w-[70rem] mx-auto">
            <div className="text-left">
              <h4 className="text-4xl font-black max-w-[37rem] text-accent-200">
                More than 1,200 schools use Ascend for administration
              </h4>
              <p className="text-accent-300 text-opacity-60 mt-3">
                Boost revenue, gain insights that help your school grow and
                scale faster.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-accent-200 text-4xl font-black">4.9</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    icon="bi:star-fill"
                    className="text-star-default"
                    key={i}
                  />
                ))}
              </div>
              <p className="text-accent-300 text-opacity-60">Capterare</p>
            </div>

            <div className="space-y-3">
              <span className="text-accent-200 text-4xl font-black">4.7</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    icon="bi:star-fill"
                    className="text-star-default"
                    key={i}
                  />
                ))}
              </div>
              <p className="text-accent-300 text-opacity-60">Trust Pilot</p>
            </div>
          </section>
        </div>
      </Container>
      <TailoredSolutions />
      <Container>
        <div className="">
          <ContentSection
            heading="Why we do what we do at Ascend"
            button={
              <button className="bg-primary-purple-500 text-grey-100 border-2 px-24 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
                About us
              </button>
            }
          />
          <div className="space-y-10 mt-32">
            <h4 className="text-5xl font-bold tracking-tighter text-accent-200">
              Loved by top school owners around the world
            </h4>
            <div className="flex justify-between">
              <div className="max-w-[34rem] border-2 bg-accent-700 p-8 space-y-4 rounded-2xl border-accent-300">
                <Icon icon="fontisto:quote-left" fontSize={25} />
                <h5 className="text-accent-300 text-opacity-60">
                  It has completely transformed our administrative processes.
                  From student enrollment to staff payroll, everything is now
                  streamlined and efficient. Highly recommended!"
                </h5>
                <div className="flex items-center gap-4">
                  <Image
                    src="/joebrendan.png"
                    alt="joebrendan"
                    width={62}
                    height={60}
                    priority
                  />
                  <div className="">
                    <p>Joe Brendan</p>
                    <h6>CEO, Lighthall</h6>
                  </div>
                </div>
              </div>
              <div className="max-w-[34rem] border-2 bg-accent-800 p-8 space-y-4 rounded-2xl border-accent-300">
                <Icon icon="fontisto:quote-left" fontSize={25} />
                <h5 className="text-accent-300 text-opacity-60">
                  We have been using this website for a few months now, and it
                  has made a significant impact on our operations. It's
                  user-friendly, visually appealing, and provides us with
                  valuable insights through its analytics and reporting
                  features.
                </h5>
                <div className="flex items-center gap-4">
                  <Image
                    src="/joebrendan.png"
                    alt="joebrendan"
                    width={62}
                    height={60}
                    priority
                  />
                  <div className="">
                    <p>Joe Brendan</p>
                    <h6>CEO, Lighthall</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-accent-900 text-center border-2 border-accent-300 p-10 py-32 space-y-4 rounded-3xl my-32 relative">
            <Image src="/wave.svg" alt="wave Logo" fill priority />
            <h4 className="text-grey-100 text-5xl font-bold tracking-tighter">
              Give your school administration an
              <span className="text-secondary-green-500"> edge</span>.
            </h4>
            <button className="bg-grey-100 border-border-colour-light px-6 py-2 rounded-md">
              Book a Demo
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TailoredSolutions(): JSX.Element {
  return (
    <section className="bg-accent-100 my-10 py-20">
      <h4 className="text-center text-4xl font-bold tracking-tight text-accent-300">
        Explore our tailored solutions
      </h4>
      <Container>
        <div className="flex flex-wrap justify-center xl:justify-between  gap-3 mt-10">
          {[
            "Student Management",
            "Staff Management",
            "Automated Payroll System",
          ].map((item, i) => (
            <div className="rounded-md overflow-hidden" key={item}>
              <Image
                src="/school-management-solution.avif"
                alt="school-management-solution"
                width={403}
                height={221}
                priority
              />

              <p className="bg-bgColour-variant-1 p-5 text-Text-high-emphasis font-bold text-xl">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ContentSection({
  direction = "lg:flex-row",
  heading,
  button,
}: {
  direction?: string;
  heading: string;
  button: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`flex gap-5 flex-col ${direction} justify-between mt-20 items-center`}
    >
      <div className="bg-warning-main h-[650px] w-[520px] rounded-lg border-2 border-black" />
      <div className="text-left space-y-8 max-w-[31rem]">
        <h4 className="text-5xl font-bold tracking-tighter text-accent-200">
          {heading}
        </h4>
        <p className="text-accent-500 leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          viverra praesent arcu diam et interdum volutpat. Lacus, egestas purus
          etiam volutpat sagittis et neque diam.
        </p>
        <ul className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <li className="flex gap-6 items-center" key={i}>
              <Icon
                icon="fluent:checkmark-12-regular"
                className="bg-accent-600 rounded-full"
                fontSize={21}
              />
              <span className="text-accent-500 leading-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum
                viverra.
              </span>
            </li>
          ))}
        </ul>
        {button}
      </div>
    </div>
  );
}

function HeadingSection(): JSX.Element {
  return (
    <div className="bg-accent-100">
      <Container>
        <header className="flex items-center justify-between gap-3 py-7">
          <Image
            src="/Ascend-Logo.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
          <ul className="flex items-center justify-end gap-9 w-[35%]">
            <li>Home</li>
            <li>Solutions</li>
            <li>About us</li>
            <li>Contact</li>
          </ul>
          <ul className="flex items-center gap-9 w-fit">
            <li>
              <button className="">Sign up</button>
            </li>
            <li>
              <button className="bg-grey-100 text-accent-300 border-2 px-4 py-2 border-border-colour-light rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all flex items-center gap-2">
                Book a Demo
              </button>
            </li>
          </ul>
        </header>
      </Container>
      <Container>
        <section className="text-center mt-24 space-y-9">
          <h2 className="text-6xl font-bold max-w-[67rem] mx-auto tracking-tighter">
            Streamlining School Administration, Management, and Payroll
            Processes.
          </h2>
          <p className="max-w-[53rem] mx-auto text-2xl text-accent-300 text-opacity-60">
            With our complete platform, you can quickly manage your school's
            administrative responsibilities, automate payroll processes and
            streamline communication—all in one place.
          </p>
          <ul className="flex justify-center gap-6">
            <li>
              <button className="bg-primary-purple-500 text-grey-100 border-2 px-6 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
                Book a Demo
              </button>
            </li>
            <li>
              <button className="bg-grey-100 text-accent-300 border-2 px-4 py-2 border-border-colour-light rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all flex items-center gap-2">
                <Icon icon="mdi:play" />
                How it Works
              </button>
            </li>
          </ul>
          <div className="relative w-full h-[35.5rem]">
            <Image
              src="/dashboard-img.avif"
              alt="dashboard-img"
              fill
              style={{
                objectFit: "contain",
              }}
              priority
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
