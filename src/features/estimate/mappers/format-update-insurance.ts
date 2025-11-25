import type { AdditionalDataFormData } from "../components/additional-data/AdditionalDataFormWrapper";
import type { UpdateInsuranceRequest } from "../type/insurance.types";
import { RelationShip } from "../type/types";

export const formatInsuranceUpdateRequest = (data: AdditionalDataFormData): UpdateInsuranceRequest => {
  return {
        customer: {
          occupation: data.customer.occupation,
          address: {
            street: data.customer.address.street,
            province: data.customer.address.province ?? '',
            municipality: data.customer.address.municipality ?? '',
            sector: data.customer.address.sector ?? '',
            building: data.customer.address.referencePoint ?? '',
          },
          dueDiligence: {
            politicallyExposed: data.customer.dueDiligence.politicallyExposed,
            hasFamilyPep: data.customer.dueDiligence.isItACloseRelative === RelationShip.FAMILY ? true : false,
            position: data.customer.dueDiligence.position ?? '',
            familyMemberName: data.customer.dueDiligence.familyName ?? '',
            familyRelationship: data.customer.dueDiligence.kinship,
            familyMemberPosition: data.customer.dueDiligence.positionFamily ?? '',
          },
          requiresFiscalReceipt: data.customer.requiresFiscalReceipt,
        },
        ...(data.endorsmentPolicy.hasEndorsmentPolicy && { endorsementAssignment: {
          institution: data.endorsmentPolicy.institution,
          sucursal: data.endorsmentPolicy.subsidiary,
          executiveName: data.endorsmentPolicy.executiveName,
          executiveEmail: data.endorsmentPolicy.executiveEmail,
          executivePhone: data.endorsmentPolicy.executivePhoneNumber,
        }}),
        ...(data.customer.hasIntermediary && { intermediary: data.customer.intermediary }),
        smartDevice: data.smartDevice,
      };
};