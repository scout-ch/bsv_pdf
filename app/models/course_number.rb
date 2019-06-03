class CourseNumber
  REGEX = %r{PBS\s?CH\s?(?<cantonal_association>[a-zA-Z]{2})\s?(?<kind>\d)(?<regional_association>\d)(?<count_number>\d)-(?<year>\d{2})}

  attr_reader :cantonal_association, :regional_association, :year, :kind, :count_number

  def initialize(course_number_string)
    match = REGEX.match(course_number_string) || {}
    @course_number_string = course_number_string
    @cantonal_association = match[:cantonal_association]
    @regional_association = match[:regional_association]
    @count_number = match[:count_number]
    @year = 2000 + match[:year].to_i
    @kind = match[:kind]
  end

  def pbs_ch?
    @course_number_string.starts_with?('PBS CH')
  end

  def to_s
    @course_number_string
    # "PBS CH #{cantonal_association} #{kind}#{regional_association}#{count_number}-#{year}"
  end
end
