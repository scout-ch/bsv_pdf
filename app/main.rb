require 'csv'
require_relative 'export/advisor_statement_pdf'
require_relative 'export/canton_statement_pdf'
require_relative 'models/course'
require_relative 'models/advisor'
require_relative 'models/advisor_statement'
require_relative 'models/canton_statement'

ROOT = File.expand_path('..', __dir__)
file = File.join(ROOT, ARGV[0] || "data/advanced_bsv_export.csv")
year = 2019
canton = 'AG'
amount_per_participant = 25.0

csv_options = {
  # encoding: "ISO8859-1:utf-8",
  encoding: "utf-8",
  col_sep: ',',
  liberal_parsing: true,
  converters: :numeric,
  headers: :first_row
}

courses = []
advisors = {}

CSV.foreach(file, csv_options) do |row|
  course = Course.from_csv(row)
  advisors[course.advisor_id] ||= Advisor.from_csv(row)
  course.assign_advisor(advisors)
  courses << course
end

advisors.each do |advisor_id, advisor|
  courses_of_advisor = courses.select { |course| course.advisor_id == advisor.id }
  next unless courses_of_advisor.count.positive?

  advisor_statement_pdf = AdvisorStatementPdf.new(AdvisorStatement.new(advisor, courses_of_advisor, year, amount_per_participant)).build
  advisor_statement_pdf.save_as(File.join(ROOT, "tmp/lkb_#{advisor.id}.pdf"))
end

courses.group_by(&:regional_association).each do |regional_association, courses_of_association|
  canton_statement_pdf = CantonStatementPdf.new(CantonStatement.new(regional_association, courses_of_association, year, amount_per_participant)).build
  canton_statement_pdf.save_as(File.join(ROOT, "tmp/canton_#{regional_association}.pdf"))
end

