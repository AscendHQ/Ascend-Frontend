export default function StudentBiodataHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis text-2xl font-bold">
          New Student
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your profile.
        </p>
      </div>
    </div>
  );
}
