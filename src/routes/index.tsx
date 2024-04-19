import { DSVImport } from "../components/DSVImport";
import { Link } from "@tanstack/react-router";
import { useStore } from "../store";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { formatCourseNumber } from "../models/course_number";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const {
    courses,
    amountPerParticipant,
    fixcostsPerParticipant,
    year,
    cantons,
    footer,
    importData,
    setAmountPerParticipant,
    setFixcostsPerParticipant,
    setYear,
    setFooter,
    setSignature,
  } = useStore();
  const { t } = useTranslation([], { lng: "de" });

  return (
    <main className="container mx-auto max-w-screen-md p-4 leading-relaxed h-screen flex flex-col">
      <h1 className="text-5xl font-bold mt-5 mb-3">{t("Index.title")}</h1>
      <section className="mb-5">
        <form>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Betrag pro Tn</label>
            <input
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              type="number"
              step="0.1"
              value={amountPerParticipant}
              onChange={(event) => setAmountPerParticipant(parseFloat(event.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fixkosten pro Tn</label>
            <input
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              type="number"
              step="0.1"
              value={fixcostsPerParticipant}
              onChange={(event) => setFixcostsPerParticipant(parseFloat(event.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Jahr</label>
            <input
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              type="number"
              step="1"
              value={year}
              onChange={(event) => setYear(parseInt(event.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fusszeile</label>
            <textarea
              rows={4}
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              value={footer}
              onChange={(event) => setFooter(event.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Unterschrift</label>
            <input
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => event.target.files?.length && setSignature(event.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">MiData BSV Export</label>
            <DSVImport onChange={(value) => importData(value)}></DSVImport>
          </div>
        </form>
      </section>
      <section>
        <h2 className="text-2xl font-bold mt-4 mb-3">Kurse</h2>
        <table>
          <thead></thead>
          <tbody>
            {courses.map((course) => (
              <tr key={formatCourseNumber(course.courseNumber)}>
                <td>{formatCourseNumber(course.courseNumber)}</td>
                <td>{course.courseNumber.cantonalAssociation}</td>
                <td>{course.kind}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-2xl font-bold mt-4 mb-3">Kantone</h2>
        <table>
          <thead></thead>
          <tbody>
            {cantons.map((canton) => (
              <tr key={canton}>
                <td>{canton}</td>
                <td>
                  <Link to="/cantons/$id" params={{ id: canton }} className="text-primary hover:underline">
                    PDF
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
