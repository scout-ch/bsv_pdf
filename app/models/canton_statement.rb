CantonStatement = Struct.new(*%i[canton courses year amount_per_participant]) do
  def total_participation_count
    courses.sum(&:participations_count)
  end

  def total_amount
    total_participation_count * amount_per_participant
  end
end
