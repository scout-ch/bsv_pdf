Attendance = Struct.new(*%i[days count]) do
  def total
    days * count
  end

  def self.from_attendance_summary(participations_string)
    return [] unless participations_string
    participations_string.split(',').map do |participation_string|
      count, days = participation_string.split('x')
      new(days.to_f, count.to_i)
    end
  end
end
