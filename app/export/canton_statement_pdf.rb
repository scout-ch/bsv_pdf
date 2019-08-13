require_relative 'pdf_base'

  class CantonStatementPdf < PdfBase
    SEPARATOR = "\u2063".freeze
    attr_reader :canton_statement

    def initialize(canton_statement)
      @canton_statement = canton_statement
    end

    def table_data
      [table_header_data] +
      @canton_statement.courses.map do |course|
        [empty_row(8)] +
        course_data(course) +
        [course_sum_data(course)] +
        [[SEPARATOR] * 8]
      end.flatten(1) +
      [table_footer_data]
    end

    def empty_row(cols = 8)
      [nil] * cols
    end

    def course_data(course)
      course_count_data(course).tap do |course_data|
        course_data[0][0] = course.course_number.to_s
        course_data[1][0] = course.kurs_kind
        course_data[0][1] = course.first_event_date
        course_data[1][1] = course.last_event_date
      end
    end

    def course_count_data(course)
      course_count_data = course.bsv_eligible_attendance.map do |attendance|
        empty_row(2) + [attendance.count, attendance.days, attendance.total] + empty_row(3)
      end
      course_count_data = course_count_data + ([empty_row(8)] * (2 - course_count_data.count)) if course_count_data.count < 2
      course_count_data
    end

    def course_sum_data(course)
      empty_row(5) + [
        course.bsv_eligible_attendances,
        format('CHF %0.2f', course.bsv_eligible_attendances * @canton_statement.amount_per_participant),
        format('CHF %0.2f', course.bsv_eligible_attendances * @canton_statement.amount_per_participant)
      ]
    end

    def table_header_data
      [
        "Kursnummer\nKursbezeichnung",
        "erster Kurstag\nletzter Kurstag",
        '# Tn',
        'Tage',
        "Tage\nx Tn",
        "Total Tage\nTn",
        "BSV Beitrag\nfür Tn",
        "Total BSV\nBeitrag"
      ]
    end

    def table_footer_data
      empty_row(4) + [
        "Total",
        @canton_statement.total_attendance_count,
        format('CHF %0.2f', @canton_statement.total_amount),
        format('CHF %0.2f', @canton_statement.total_amount)
      ]
    end


    def build
      move_down 40
      text "Bern, #{Time.now.strftime('%d.%m.%Y')}"
      move_down 12
      text "Auszahlung der Kurs-Subventionen des KV #{@canton_statement.canton}", size: 14, style: :bold
      move_down 12
      text "In diesen Tagen können wir Euch die Kurs-Subventionen des BSV für die bis heute abgerechneten Kurse überweisen. Wir bitten Euch, Euren Kassierer darüber zu informieren."
      move_down 12
      text "Der Tagesansatz ist aktuell CHF #{@canton_statement.amount_per_participant} / TN"
      move_down 12
      text "Ohne Euren Gegenbericht innert 20 Tagen gehen wir davon aus, dass Ihr mit den unten aufgeführten Angaben einverstanden seid."
      move_down 20

      @document.table table_data,
        column_widths: [110, 70, 35, 35, 35, 70, 70, 70],
        cell_style: { padding: [2, 4, 2, 4], size: 8, overflow: :shrink_to_fit },
        header: true do
        cells.style(align: :center, border_width: 1, borders: [:left, :right])
        row(0).style(font_style: :bold, borders: [:left, :right, :top, :bottom])
        row(-1).style(font_style: :bold, borders: [:top])
        column(0).style(align: :left)
        column(1).style(align: :left)
        column(6).style(align: :right)
        column(7).style(align: :right)
        # column(4).style(align: :right)
        column(0).filter do |cell|
          cell.style(font_style: :bold) if cell.content&.start_with?("PBS CH")
        end

        rows(0..-1).filter do |cell|
          if cell.content == SEPARATOR
            cell.style(borders: [:bottom, :left, :right])
            cell.content = ""
          end
        end
      end

      move_down 20
      text "Für die Beantwortung von Fragen stehen wir Euch gerne zur Verfügung"
      move_down 12
      text "Freundliche Grüsse"
      move_down 12
      image File.join(__dir__, '..', 'assets', 'signature.png'), width: 120

      move_down 20
      text "Sonja Dietrich"
      text "Ausbildungssekretariat PBS"
      text "Direktwahl: 031 328 05 42"
      text "E-Mail: sonja.dietrich@pbs.ch"

      self
    end
  end
