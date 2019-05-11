ADVISOR_FIELD_MAPPING = {
  id: "LKB Personen-ID",
  first_name: "LKB Vorname",
  last_name: "LKB Nachname",
  nickname: "LKB Pfadiname",
  address:  "LKB Adresse",
  zip_code: "LKB PLZ",
  town:  "LKB Ort",
  country: "LKB Land",
  email: "LKB Email",
  salutation:  "LKB Anrede"
}
Advisor = Struct.new(*ADVISOR_FIELD_MAPPING.keys) do
  def self.from_csv(row)
    new(*row.to_h.slice(*ADVISOR_FIELD_MAPPING.values).values)
  end

  def equal?(other)
    id == other.id
  end
end
