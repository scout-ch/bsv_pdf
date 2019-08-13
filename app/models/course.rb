require_relative 'attendance'
require_relative 'course_number'

COURSE_FIELD_MAPPING = {
  # vereinbarungs_id_fiver: "Vereinbarung-ID-FiVer",
  # kurs_id_fiver: "Kurs-ID-FiVer",
  kurs_kind: "Kursart",
  # cantonal_association: "Kantonalverband",
  # regional_association: "Regionalverband",
  course_number_string: "Kursnummer",
  first_event_date: "Start Datum",
  last_event_date: "End Datum",
  # location: "Kursort",
  training_days: "Ausbildungstage",
  bsv_eligible_participations_count: "Berechtigte Teilnehmende (17-30)",
  bsv_eligible_attendance_summary: "Berechtigte Teilnehmende (17-30) x Tage",
  bsv_eligible_attendances: "Berechtigte Tage",
  # leader_count: "Kursleitende",
  all_participants_count: "Teilnehmende Total (inkl. Kursleitende)",
  all_participants_attendance_summary: "Teilnehmende Total x Tage",
  all_participants_attendances: "Total Tage",
  # bsv_days: "BSV Tage",
  # canton_count: "Wohnkantone der TN",
  # language_count: "Sprachen",
  advisor_id: "LKB Personen-ID"
}

Course = Struct.new(*COURSE_FIELD_MAPPING.keys) do
  attr_accessor :advisor, :year, :course_number

  def initialize(*values)
    super
    @course_number ||= CourseNumber.new(course_number_string)
  end

  def pbs_ch?
    course_number.pbs_ch?
  end

  def regional_association
    return cantonal_association unless cantonal_association == "ZH"
    "#{cantonal_association}_#{course_number.regional_association}"
  end

  def cantonal_association
    course_number.cantonal_association
  end

  def year
    course_number.year
  end

  def bsv_eligible_attendance
    @bsv_eligible_attendance ||= Attendance.from_attendance_summary(bsv_eligible_attendance_summary)
  end

  def all_participants_attendance
    @all_participants_attendance ||= Attendance.from_attendance_summary(all_participants_attendance_summary)
  end

  def assign_advisor(advisors)
    self.advisor = advisors[advisor_id]
  end

  def self.from_csv(row)
    new(*row.to_h.slice(*COURSE_FIELD_MAPPING.values).values)
  # rescue CourseNumber::MalformedCourseNumberError
  rescue
    nil
  end
end
