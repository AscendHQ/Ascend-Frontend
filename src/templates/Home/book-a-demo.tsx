import { Button } from "@/components/ui/button";

export default function BookADemo() {
  return (
    <div className="bg-accent-900 text-center border-2 border-accent-300 px-8 md:px-10 py-32 space-y-4 rounded-3xl mt-32 relative">
      <h4 className="text-grey-100 text-step-4 font-bold tracking-tighter">
        Give your school administration an
        <span className="text-secondary-green-500"> edge</span>.
      </h4>
      <Button>Book a Demo</Button>
    </div>
  );
}
