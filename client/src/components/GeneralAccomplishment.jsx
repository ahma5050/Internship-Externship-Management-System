import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import { FaPrint, FaFilePdf, FaStar, FaAward, FaChartLine } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GeneralAccomplishment = () => {
  const [studentData, setStudentData] = useState([]);
  const [groupedEvaluations, setGroupedEvaluations] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef();

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");
        const res = await fetch(`/api/evaluationRoute/evaluations/${facultyId}`);
        const data = await res.json();
        
        const grouped = data.reduce((acc, evaluation) => {
          const { studentId } = evaluation;
          if (!acc[studentId]) acc[studentId] = [];
          acc[studentId].push(evaluation);
          return acc;
        }, {});
        
        setGroupedEvaluations(grouped);
        // Set first student as default
        const firstStudentId = Object.keys(grouped)[0];
        if (firstStudentId) {
          setSelectedStudent(grouped[firstStudentId]);
        }
      } catch (err) {
        console.error("Failed to load evaluations", err);
      }
    };

    fetchEvaluations();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    
    try {
      const input = reportRef.current;
      
      // Add loading indicator
      const pdfButton = document.querySelector('#pdfButton');
      const originalText = pdfButton.textContent;
      pdfButton.textContent = 'Generating PDF...';
      
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        backgroundColor: '#FFFFFF',
        onclone: (clonedDoc) => {
          // Ensure all dynamic content is visible in the PDF
          clonedDoc.querySelectorAll('.hidden-print').forEach(el => {
            el.style.display = 'block';
          });
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Add additional pages if content is too long
      let heightLeft = imgHeight;
      let position = 0;
      
      while (heightLeft >= 0) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Internship_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
      // Restore button text
      const pdfButton = document.querySelector('#pdfButton');
      if (pdfButton) {
        pdfButton.textContent = 'Generate PDF';
      }
    }
  };

  const renderStudentReport = (evaluations) => {
    const totalEvaluations = evaluations?.length || 0;
    const averageGrade = totalEvaluations > 0 
      ? (evaluations.reduce((sum, evalItem) => sum + (parseFloat(evalItem.overallGrade) || 0), 0) / totalEvaluations).toFixed(1)
      : 0;
    
    const highestGrade = totalEvaluations > 0
      ? Math.max(...evaluations.map(evalItem => parseFloat(evalItem.overallGrade) || 0))
      : 0;

    const improvementPercentage = totalEvaluations > 1
      ? (((evaluations[evaluations.length - 1].overallGrade - evaluations[0].overallGrade) / evaluations[0].overallGrade * 100).toFixed(1))
      : 0;

    return (
      <div className="mb-12 print:mb-8 print:break-inside-avoid">
        {/* Header Section */}
        <div className="border-b-2 border-blue-200 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-gray-200">
                {evaluations[0]?.studentName || "Student Name"}
              </h1>
              <p className="text-xl text-blue-600 font-medium">
                {evaluations[0]?.studentEmail || "student@email.com"}
              </p>
              <p className="text-gray-600 mt-1 dark:text-gray-200">
                Internship Period: {new Date(evaluations[0]?.startDate).toLocaleDateString()} - {new Date(evaluations[0]?.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-gray-600 p-4 rounded-lg text-center">
              <p className="text-sm font-medium text-blue-800 dark:text-gray-200">Overall Grade</p>
              <p className={`text-5xl font-bold ${
                averageGrade >= 90 ? 'text-green-600' : 
                averageGrade >= 80 ? 'text-blue-600' : 
                averageGrade >= 70 ? 'text-yellow-500' : 
                'text-red-500'
              }`}>
                {averageGrade}
              </p>
              <p className="text-xs text-blue-700 mt-1 dark:text-gray-200">Average of {totalEvaluations} evaluations</p>
            </div>
          </div>
        </div>

        {/* Key Achievements - Now properly included in PDF */}
        <div className="mb-10 pdf-achievements">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center dark:text-gray-200">
            <FaAward className="mr-2 text-yellow-500" /> Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="dark:bg-gray-800 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-3">
                <FaStar className="text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-500">Highest Grade</h3>
              </div>
              <p className="text-4xl font-bold text-blue-900 dark:text-blue-500">{highestGrade}</p>
              <p className="text-sm text-blue-700 mt-1 dark:text-blue-500">Outstanding performance</p>
            </div>
            
            <div className="dark:bg-gray-800 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-3">
                <FaChartLine className="text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-500">Performance Trend</h3>
              </div>
              <p className={`text-4xl font-bold ${improvementPercentage >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {improvementPercentage}%
              </p>
              <p className="text-sm text-green-700 mt-1 dark:text-green-500">
                {improvementPercentage >= 0 ? 'Improvement' : 'Decline'} over internship
              </p>
            </div>
            
            <div className="dark:bg-gray-800 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-3">
                <FaAward className="text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-500">Skills Mastered</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Teamwork', 'Problem Solving', 'Technical Skills', 'Communication', 'Time Management'].map((skill) => (
                  <span key={skill} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Performance Breakdown */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-200">Weekly Performance Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden dark:text-gray-200">
              <thead className="bg-blue-500 text-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left">Week</th>
                  <th className="py-3 px-4 text-left">Dates</th>
                  <th className="py-3 px-4 text-center">Grade</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {evaluations.map((evalItem, index) => (
                  <tr key={index} className="">
                    <td className="py-4 px-4 font-medium">Week {index + 1}</td>
                    <td className="py-4 px-4">
                      {new Date(evalItem.weekStartDate).toLocaleDateString()} - {new Date(evalItem.weekEndDate).toLocaleDateString()}
                    </td>
                    <td className={`py-4 px-4 text-center font-bold ${
                      evalItem.overallGrade >= 90 ? 'text-green-600' : 
                      evalItem.overallGrade >= 80 ? 'text-blue-600' : 
                      evalItem.overallGrade >= 70 ? 'text-yellow-500' : 
                      'text-red-500'
                    }`}>
                      {evalItem.overallGrade}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        evalItem.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        evalItem.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {evalItem.status || 'unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Assessment */}
        <div className="border-t-2 border-blue-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-200">Final Assessment</h2>
          <div className="bg-yellow-50 border-l-8 border-yellow-400 p-4 mb-6 dark:bg-gray-700">
            <p className="text-yellow-700 font-medium dark:text-yellow-300">
              {averageGrade >= 90 
                ? "Exceptional performance throughout the internship. Highly recommended for future opportunities."
                : averageGrade >= 80
                ? "Strong performance with consistent results. Recommended for relevant positions."
                : averageGrade >= 70
                ? "Satisfactory performance with room for growth. Shows potential with additional guidance."
                : "Performance below expectations. Additional training and support would be beneficial."
              }
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="print-container text-gray-800 p-8 rounded-xl shadow-2xl max-w-6xl mx-auto my-8">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Internship Accomplishment Reports
        </h2>
        <div className="flex space-x-4">
          <Button gradientDuoTone="purpleToBlue" onClick={handlePrint}>
            <FaPrint className="mr-2" /> Print All Reports
          </Button>
          <Button 
            id="pdfButton"
            gradientDuoTone="cyanToBlue" 
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
          >
            <FaFilePdf className="mr-2" /> 
            {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF'}
          </Button>
          <Button 
            gradientDuoTone={showAllStudents ? "pinkToOrange" : "tealToLime"} 
            onClick={() => setShowAllStudents(!showAllStudents)}
          >
            {showAllStudents ? "Show Single" : "Show All Students"}
          </Button>
        </div>
      </div>

      <div ref={reportRef}>
        {!showAllStudents && (
          <div className="mb-8 print:hidden">
            <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
              Select Student
            </label>
            <select
              id="studentSelect"
              className="dark:text-gray-200 dark:bg-gray-800 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedStudent ? selectedStudent[0]?.studentId : ''}
              onChange={(e) => {
                const studentId = e.target.value;
                setSelectedStudent(groupedEvaluations[studentId]);
              }}
            >
              {Object.entries(groupedEvaluations).map(([studentId, evaluations]) => (
                <option key={studentId} value={studentId}>
                  {evaluations[0]?.studentName || `Student ${studentId}`}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-12 print:space-y-8">
          {showAllStudents ? (
            Object.values(groupedEvaluations).map((evaluations, index) => (
              <React.Fragment key={index}>
                {renderStudentReport(evaluations)}
                {index < Object.values(groupedEvaluations).length - 1 && (
                  <div className="print:hidden border-t-2 border-gray-200 my-8"></div>
                )}
              </React.Fragment>
            ))
          ) : (
            selectedStudent && renderStudentReport(selectedStudent)
          )}
        </div>

        <div className="mt-12 print:mt-8 text-center text-sm text-gray-500 print:block">
          <p>Generated on: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            margin: 0;
            box-shadow: none;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: auto;
            margin: 15mm;
          }
        }
      `}</style>
    </div>
  );
};

export default GeneralAccomplishment;