/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div className="font-GTWalsheimPro">
      <SectionOne />
      <section className="bg-bgColour-variant-1 mt-16">
        <Container>
          <div className="text-center">
            <h3 className="text-5xl font-bold tracking-tighter text-accent-200">
              Why our clients choose Ascend
            </h3>
            <p className="mt-5 text-accent-300 text-opacity-60">
              Invoicing, bill pay, and cash flow control for freelancers and
              small businesses.
            </p>

            <div className="flex text-left mt-24 justify-between">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  className="max-w-[360px] space-y-6 border p-5 rounded-md"
                  key={i}
                >
                  <Image
                    src="/customizable-report.svg"
                    alt="customizable-report"
                    className="dark:invert"
                    width={24}
                    height={24}
                    priority
                  />

                  <h4 className="text-2xl text-accent-400 font-bold">
                    Customizable Reports
                  </h4>
                  <p className="text-accent-500 ">
                    You can easily generate customized reports that provide
                    valuable insights into your school's finances, staff
                    management and meet your specific requirements.
                  </p>
                </div>
              ))}
            </div>
            <ContentSection />
            <ContentSection direction="flex-row-reverse" />
            <section className="flex border border-accent-300 justify-between p-10 items-center rounded-lg mt-10">
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
            </section>
          </div>
        </Container>
        <TailoredSolutions />
        <Container>
          <div className="">
            <ContentSection />
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
            <div className="bg-accent-900 text-center p-10 py-32 space-y-4 rounded-lg my-32">
              <h4 className="text-grey-100 text-4xl font-bold">
                Give your school administration an
                <span className="text-secondary-green-500"> edge</span>.
              </h4>
              <button>Book a Demo</button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
function TailoredSolutions() {
  return (
    <section className="bg-accent-100 my-10 py-20">
      <h4 className="text-center text-4xl font-bold tracking-tight text-accent-300">
        Explore our tailored solutions
      </h4>
      <Container>
        <div className="flex justify-between mt-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="rounded-md overflow-hidden" key={i}>
              <Image
                src="/school-management-solution.avif"
                alt="school-management-solution"
                width={403}
                height={221}
                priority
              />

              <p className="bg-bgColour-variant-1 p-5 text-Text-high-emphasis font-bold text-xl">
                Student Management:
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ContentSection({ direction = "flex-row" }) {
  return (
    <div
      className={`flex gap-5 ${direction} justify-between mt-20 items-center`}
    >
      <div className="bg-warning-main h-[700px] w-[520px] rounded-lg border-2 border-black" />
      <div className="text-left space-y-8 max-w-[31rem]">
        <h4 className="text-5xl font-bold tracking-tighter text-accent-200">
          Effortlessly handle school administration
        </h4>
        <p className="text-accent-500 leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          viverra praesent arcu diam et interdum volutpat. Lacus, egestas purus
          etiam volutpat sagittis et neque diam.
        </p>
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
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
        <button>Book a free demo</button>
      </div>
    </div>
  );
}

function SectionOne() {
  return (
    <div className="bg-accent-100">
      <Container>
        <header className="flex items-center justify-between gap-3 py-7">
          <Image
            src="/Ascend-Logo.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          <ul className="flex items-center gap-9">
            <li>Home</li>
            <li>Solutions</li>
            <li>About us</li>
            <li>Contact</li>
          </ul>
          <ul className="flex items-center gap-9">
            <li>Sign up</li>
            <li>Book a Demo</li>
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
          <ul className="flex justify-center">
            <li>
              <button>Book a Demo</button>
            </li>
            <li>
              <button>How it Works</button>
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
