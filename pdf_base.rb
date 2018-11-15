require 'prawn'
require 'prawn/table'

class PdfBase
  include Prawn::View

  def document
    @document ||= Prawn::Document.new(
      page_size: 'A4',
      optimize_objects: true,
      compress: true,
      margin: [50] * 4,
      align: :left, kerning: true
    )
    @document.font_size(10)
    @document
  end
end
