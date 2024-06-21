/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { ApiError } from '../../utils';
import Semester from '../semester/semester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const academicSemesterId = payload?.academicSemester;

  const academicSemester = await Semester.findById(academicSemesterId);

  if (!academicSemester) {
    throw new ApiError(404, 'Semester not found');
  }

  const isRunningAnySemester = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.ONGOING },
      { status: RegistrationStatus.UPCOMING },
    ],
  });

  if (isRunningAnySemester) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Already have ${isRunningAnySemester.status} status in another semester`,
    );
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester: academicSemesterId,
  });

  if (isSemesterRegistrationExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.queryModel;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  console.log({ currentSemesterStatus, requestedStatus });

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This semester registration is already ended',
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You cannot change status UPCOMING to ENDED at a time',
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You cannot change status ONGOING to UPCOMING',
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
