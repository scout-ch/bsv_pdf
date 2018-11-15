require 'csv'
require_relative 'advisor_statement_pdf'

# path = File.

options = {
  encoding: "ISO8859-1:utf-8",
  col_sep: ';',
  liberal_parsing: true,
  headers: :first_row
}

# %i[kurs_id_fiver kurs_kind kantonalverband region number first_event_date last_event_date location training_days participant_count leader_count canton_count language_count id first_name last_name nickname address zip_code town email salutation_value]
Course = Struct.new(*%i[vereinbarungs_id_fiver kurs_id_fiver kurs_kind kantonalverband region number first_event_date last_event_date location advisor_person_id training_days participant_count leader_count canton_count language_count])
Advisor = Struct.new(*%i[id first_name last_name nickname address zip_code town country email salutation_value])
AdvisorStatement = Struct.new(*%i[advisor courses year])

courses = []
advisors = {}

CSV.foreach("data/advanced_bsv_export.csv", options) do |row|
  course = Course.new(*(row[0..9] + []))
  courses << course
  advisors[course.advisor_person_id.to_i] ||= Advisor.new(*row[9..18])
  p course
end

  p courses
  p advisors

  AdvisorStatementPdf.new(AdvisorStatement.new(advisors.values.last, courses, 2018)).build.save_as('xxx.pdf')

