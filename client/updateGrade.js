updateGrade = function(teacherId) {
  var teacherObj = Teachers.findOne(teacherId);
  var totalOpinions = teacherObj.positiveOpinions + teacherObj.negativeOpinions;
  var opinionsPercent = (teacherObj.positiveOpinions / totalOpinions) * 100;

  var getGradeL = function(opinionsPercent) {
    if (opinionsPercent >= 95) return 'APlusL';
    if (opinionsPercent >= 90) return 'AL';
    if (opinionsPercent >= 85) return 'AMinusL';

    if (opinionsPercent >= 80) return 'BPlusL';
    if (opinionsPercent >= 75) return 'BL';
    if (opinionsPercent >= 70) return 'BMinusL';

    if (opinionsPercent >= 65) return 'CPlusL';
    if (opinionsPercent >= 60) return 'CL';
    if (opinionsPercent >= 55) return 'CMinusL';

    if (opinionsPercent >= 50) return 'DL';
    if (opinionsPercent >= 0) return 'FL';
  };

  var getGrade = function(opinionsPercent) {
    if (opinionsPercent >= 95) return 'APlus';
    if (opinionsPercent >= 90) return 'A';
    if (opinionsPercent >= 85) return 'AMinus';

    if (opinionsPercent >= 80) return 'BPlus';
    if (opinionsPercent >= 75) return 'B';
    if (opinionsPercent >= 70) return 'BMinus';

    if (opinionsPercent >= 65) return 'CPlus';
    if (opinionsPercent >= 60) return 'C';
    if (opinionsPercent >= 55) return 'CMinus';

    if (opinionsPercent >= 50) return 'D';
    if (opinionsPercent >= 0) return 'F';
  };

  Teachers.update(teacherObj._id, {$set: {opinionsPercent: opinionsPercent,gradeL: getGradeL(opinionsPercent),grade: getGrade(opinionsPercent)}});
};
