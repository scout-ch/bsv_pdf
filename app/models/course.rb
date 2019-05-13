require_relative 'participation'
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
  # bsv_days: "BSV Tage",
  participant_count: "Teilnehmende (17-30)",
  participant_days: "Teilnehmende (17-30) x Tage",
  # leader_count: "Kursleitende",
  # person_count: "Teilnehmende Total (inkl. Kursleitende)",
  # person_days: "Teilnehmende Total x Tage",
  # canton_count: "Wohnkantone der TN",
  # language_count: "Sprachen",
  advisor_id: "LKB Personen-ID"
}

Course = Struct.new(*COURSE_FIELD_MAPPING.keys) do
  attr_accessor :advisor, :year, :course_number

  def initialize(*values)
    super
  end

  def course_number
    @course_number ||= CourseNumber.new(course_number_string)
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

  def participations
    @participations ||= Participation.from_participations_string(participant_days)
  end

  def participations_count
    participations.sum(&:total)
  end

  def assign_advisor(advisors)
    self.advisor = advisors[advisor_id]
  end

  def self.from_csv(row)
    new(*row.to_h.slice(*COURSE_FIELD_MAPPING.values).values)
  end
end
