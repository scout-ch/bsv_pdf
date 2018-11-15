
require_relative 'pdf_base'

  class AdvisorStatementPdf < PdfBase
    def initialize(advisor_statement)
      @advisor_statement = advisor_statement
    end

    def table_data
      [
        ['Kursschlüssel', 'Kursart J+S LS/T', 'PBS Kursart', 'Stufen', 'Entschädigung']
      ] +
      @advisor_statement.courses.map do |course|
        [course.number, course.kurs_kind, course.kurs_kind, nil, format('%0.2f', 0)]
      end +
      [[nil, nil, nil, "Total", format('%0.2f', 0)]]
    end


    def build
      move_down 80
      text "#{@advisor_statement.advisor.first_name} #{@advisor_statement.advisor.last_name}"
      text @advisor_statement.advisor.address
      text "#{@advisor_statement.advisor.zip_code} #{@advisor_statement.advisor.town} #{@advisor_statement.advisor.country}"
      move_down 80
      text "LKB Entschädigung #{@advisor_statement.year}", size: 14, style: :bold
      move_down 20
      text @advisor_statement.advisor.salutation_value
      move_down 12
      text "Im vergangenen Jahr hast Du die unten aufgeführten Kurse betreut. Dafür erhälst Du heute die LKB Entschädigung."
      move_down 20

      @document.table table_data, column_widths: [80, 125, 125, 80, 80], cell_style: { padding: [2, 4, 2, 4] } do
        cells.style(size: 8, border_width: 1)
        column(4).style(align: :right)
        column(0).style(font_style: :bold)
        row(-1).style(borders: [:top], font_style: :bold)
      end

      move_down 20
      text "Nochmals besten Dank für Deinen Einsatz als Leiterkursbetreuer sowie für die Begeisterung und die Zeit, die Du dafür einsetzt."
      move_down 12
      text "Ich hoffe sehr, dass wir auch in Zukunft auf Deine Hilfe zählen können."
      move_down 12
      text "Mit herzlichen Pfadigrüssen"

      move_down 20
      text "Sonja Dietrich"
      text "Ausbildungssekretariat PBS"
      text "Direktwahl: 031 328 05 42"
      text "E-Mail: sonja.dietrich@pbs.ch"

      # helpers = ActionController::Base.helpers
        # data = @invoice.invoice_parts.map do |invoice_part|
        #   [invoice_part.label, invoice_part.label_2, helpers.number_to_currency(invoice_part.amount, unit: 'CHF')]
        # end
        # data << ['Total', '', helpers.number_to_currency(@invoice.amount, unit: 'CHF')]
      # end

      # def call(pdf)
        # pdf.bounding_box([0, 440], width: 494, height: 500) do
          # pdf.table table_data, column_widths: [200, 200, 94], cell_style: { borders: [], padding: [0, 4, 4, 0] } do
          #   cells.style(size: 10)
          #   column(2).style(align: :right)
          #   row(-1).style(borders: [:top], font_style: :bold, padding: [4, 4, 4, 0])
          # end
        # end

      self
    end
  end
