require_relative 'pdf_base'

  class CantonStatementPdf < PdfBase
    def initialize(canton_statement)
      @canton_statement = canton_statement
    end

    def table_data
      [
        [
          [
            ['Kursnummer', 'erster Kurstag'],
            ['Kursart', 'letzter Kurstag']
          ]
        ]
      ] +
      @canton_statement.courses.map do |course|
        [
          [
            [course.number, course.first_event_date],
            [course.kurs_kind, course.last_event_date]
          ],
          course.participant_count
        ]
      end
    end


    def build
      move_down 40
      text "Bern, "
      text "Auszahlung der Kurs-Subventionen des KV #{@canton_statement.canton}", size: 14, style: :bold
      move_down 12
      text "In diesen Tagen können wir Euch die Kurs-Subventionen des BSV für die bis heute abgerechneten Kurse berweisen. Wir bitten Euch, Euren Kassierer darüber zu informieren."
      move_down 12
      text "Ohne Euren Gegenbericht innert 20 Tagen gehen wir davon aus, dass Ihr mit den unten aufgeführten Angaben einverstanden seid."
      move_down 20

      # @document.table table_data, column_widths: [80, 125, 125, 80, 80], cell_style: { padding: [2, 4, 2, 4] } do
      @document.table table_data, column_widths: [280, 60, 60, 60, 60, 60], cell_style: { size: 6 } do
        # cells.style(size: 4, border_width: 16
        # column(4).style(align: :right)
        # column(0).style(font_style: :bold)
        # row(-1).style(borders: [:top], font_style: :bold)
      end

      move_down 20
      text "Für die Beantwortung von Fragen stehen wir Euch gerne zur Verfügung"
      move_down 12
      text "Freundliche Grüsse"

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
