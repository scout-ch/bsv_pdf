CantonStatement = Struct.new(*%i[canton courses year amount_per_participant]) do
  def total_attendance_count
    courses.sum(&:bsv_eligible_attendances)
  end

  def total_amount
    total_attendance_count * amount_per_participant
  end
end
