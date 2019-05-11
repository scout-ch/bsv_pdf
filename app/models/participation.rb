Participation = Struct.new(*%i[days count]) do
  def total
    days * count
  end

  def self.from_participations_string(participations_string)
    return [] unless participations_string
    participations_string.split(',').map do |participation_string|
      days, count = participation_string.split('x')
      new(days.to_f, count.to_i)
    end
  end
end
