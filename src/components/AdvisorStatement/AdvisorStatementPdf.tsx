import React, { ReactElement } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Advisor } from '../../models/advisor';
import { Course } from '../../models/course';
import signature from '../../images/signature.png'

// Font.register({ src: OpenSansRegular, family: 'Opensans-Regular' });
// Font.register({ src: OpenSansBold, family: 'Opensans-Bold' });


const styles = StyleSheet.create({
  page: {
    margin: 0,
    fontSize: 10,
    padding: 0,
    fontFamily: 'OpenSans-Regular'
  },

  pageMargins: {
    margin: 50
  },

  address: {
    marginTop: 80,
    marginBottom: 80
  },

  p: {
    marginBottom: 12
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  footer: {

  },

  table: {
    display: 'flex',
    flexDirection: 'column',
  },

  tr: {
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1
  },

  td: {
    margin: 'auto',
    textAlign: 'left',
    flexGrow: 1,
    border: '1px solid black'
  },

  bold: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold'
  }
});

export type AdvisorStatement = {
  advisor: Advisor;
  courses: Course[];
  year: number;
  amountPerCourse: number;
}

function StatementTable({ courses, amountPerCourse }: { courses: Course[], amountPerCourse: number }): ReactElement {
  // const total = courses.length * amountPerCourse

  return (
    <View style={{ ...styles.table, marginBottom: 20 }} >
      <View style={styles.tr}>
        <View debug={true} style={{ ...styles.td, width: '25%' }}><Text style={styles.bold}>Kursschlüssel</Text></View>
        <View style={{ ...styles.td, width: '25%' }}><Text style={styles.bold}>Kursart J+S LS/T</Text></View>
        <View style={{ ...styles.td, width: '25%' }}><Text style={styles.bold}>Kursart PBS</Text></View>
        <View style={{ ...styles.td, width: '25%' }}><Text style={styles.bold}>Entschädigung</Text></View>
      </View>
      {courses.map(course => (
        <View style={styles.tr}>
          <View style={{ ...styles.td, width: '25%' }}><Text>{course.courseNumber.toString()}</Text></View>
          <View style={{ ...styles.td, width: '25%' }}></View>
          <View style={{ ...styles.td, width: '25%' }}></View>
          <View style={{ ...styles.td, width: '25%' }}></View>
        </View>
      ))
      }
    </ View >
  )
}

export function AdvisorStatementPdf({ advisor, year, courses, amountPerCourse }: AdvisorStatement): ReactElement {
  return (
    <Document>
      <Page size="A4" ruler={true} style={styles.page}>
        <View style={styles.pageMargins}>
          <View style={styles.address}>
            <Text>{`${advisor.firstName} ${advisor.lastName}`}</Text>
            <Text>{`${advisor.zipcode} ${advisor.town} ${advisor.country}`}</Text>
            <Text>{advisor.address}</Text>
          </View>
          <Text style={styles.pageTitle}>{`LKB Entschädigung ${year}`}</Text>
          <Text style={styles.p}>{advisor.salutation}</Text>
          <Text style={styles.p}>Im vergangenen Jahr hast Du die unten aufgeführten Kurse betreut. Dafür erhälst Du heute die LKB Entschädigung.</Text>

          <StatementTable courses={courses} amountPerCourse={amountPerCourse}></StatementTable>

          <Text style={styles.p}>Nochmals besten Dank für Deinen Einsatz als Leiterkursbetreuer sowie für die Begeisterung und die Zeit, die Du dafür einsetzt.</Text>
          <Text style={styles.p}>Ich hoffe sehr, dass wir auch in Zukunft auf Deine Hilfe zählen können.</Text>
          <Text style={styles.p}>Mit herzlichen Pfadigrüssen</Text>
          <View style={styles.footer}>
            <Image src={signature} style={{ width: 150 }}></Image>
            <Text>Ausbildungssekretariat PBS</Text>
            <Text>Direktwahl: 031 328 05 42</Text>
            <Text>E-Mail: sonja.dietrich@pbs.ch</Text>
          </View>
        </View>
      </Page>
    </Document >
  )
}
/*

def table_data
[
  ['Kursschlüssel', 'Kursart J+S LS/T', 'PBS Kursart', 'Entschädigung']
] +
  courses.map do | course |
    [course.course_number.to_s, course.kurs_kind, course.kurs_kind, format('%0.2f', amount_per_course)]
      end +
  [[nil, nil, "Total", format('%0.2f', courses.count * amount_per_course)]]
    end


text "", size: 14, style: : bold
move_down 20
text
move_down 12
text ""
move_down 20

@document.table table_data, column_widths: [110, 150, 150, 80, 80], cell_style: { padding: [2, 4, 2, 4] } do
  cells.style(size: 8, border_width: 1)
        column(-1).style(align: : right)
        column(0).style(font_style: : bold)
row(0).style(font_style: : bold)
row(-1).style(borders: [: top], font_style: : bold)
end

text ""
image File.join(__dir__, '..', 'assets', 'signature.png'), width: 120

move_down 20
text "Sonja Dietrich"
*/
