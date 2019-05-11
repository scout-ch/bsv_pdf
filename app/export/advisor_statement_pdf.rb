
require_relative 'pdf_base'

  class AdvisorStatementPdf < PdfBase
    attr_reader :advisor_statement

    def initialize(advisor_statement)
      @advisor_statement = advisor_statement
    end

    def table_data
      [
        ['Kursschlüssel', 'Kursart J+S LS/T', 'PBS Kursart', 'Entschädigung']
      ] +
      advisor_statement.courses.map do |course|
        [course.course_number.to_s, course.kurs_kind, course.kurs_kind, format('%0.2f', advisor_statement.amount_per_course)]
      end +
      [[nil, nil, "Total", format('%0.2f', advisor_statement.courses.count * advisor_statement.amount_per_course)]]
    end


    def build
      move_down 80
      text "#{advisor_statement.advisor.first_name} #{advisor_statement.advisor.last_name}"
      text advisor_statement.advisor.address
      text "#{advisor_statement.advisor.zip_code} #{advisor_statement.advisor.town} #{advisor_statement.advisor.country}"
      move_down 80
      text "LKB Entschädigung #{advisor_statement.year}", size: 14, style: :bold
      move_down 20
      text advisor_statement.advisor.salutation
      move_down 12
      text "Im vergangenen Jahr hast Du die unten aufgeführten Kurse betreut. Dafür erhälst Du heute die LKB Entschädigung."
      move_down 20

      @document.table table_data, column_widths: [110, 150, 150, 80, 80], cell_style: { padding: [2, 4, 2, 4] } do
        cells.style(size: 8, border_width: 1)
        column(-1).style(align: :right)
        column(0).style(font_style: :bold)
        row(0).style(font_style: :bold)
        row(-1).style(borders: [:top], font_style: :bold)
      end

      move_down 20
      text "Nochmals besten Dank für Deinen Einsatz als Leiterkursbetreuer sowie für die Begeisterung und die Zeit, die Du dafür einsetzt."
      move_down 12
      text "Ich hoffe sehr, dass wir auch in Zukunft auf Deine Hilfe zählen können."
      move_down 12
      text "Mit herzlichen Pfadigrüssen"
      image File.join(__dir__, '..', 'assets', 'signature.png'), width: 120

      move_down 20
      text "Sonja Dietrich"
      text "Ausbildungssekretariat PBS"
      text "Direktwahl: 031 328 05 42"
      text "E-Mail: sonja.dietrich@pbs.ch"

      self
    end
  end
