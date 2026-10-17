function SectionTitle({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">

      <h2 className="text-4xl font-bold">

        {title}

      </h2>

      <p className="mt-4 text-lg text-gray-600">

        {subtitle}

      </p>

    </div>
  );
}

export default SectionTitle;