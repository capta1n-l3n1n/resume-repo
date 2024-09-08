export const BASE_CODE = 3;

export const errorCode = {
    SYS_ERR: {
        UNKNOW: '000001',
        DATA_PROCESS: '000002',
        REQUEST_INVALID: '000003',
        ENTITY_EXISTED: '000004',
        UNAUTHORIZED: '000005',
        FORBIDDEN: '000006',
        NOT_FOUND: '000007',
        MISSING_MIDDLEWARE: '000008',
    },
    ZALO_APP_ERR: {
        ACTIVITY_LOG_NOT_FOUND: `${BASE_CODE}00001`,
        ELASTIC_INDEX_NOT_FOUND: `${BASE_CODE}00002`,
        STORE_NOT_FOUND: `${BASE_CODE}00003`,
        XYZ_CHECK_IN_OUT_DISTANCE: `${BASE_CODE}00004`,
        SESSION_EXPIRED: `${BASE_CODE}00005`,
        CHECK_OUT_FORBIDDEN: `${BASE_CODE}00006`,
        INVALID_ID: `${BASE_CODE}00007`,
    },
};

export const errorMessage = {
    // System
    [errorCode.SYS_ERR.UNKNOW]: 'System error occured. Please try again later.',
    [errorCode.SYS_ERR.DATA_PROCESS]: 'Processing data has error',
    [errorCode.SYS_ERR.REQUEST_INVALID]: 'Request is invalid',
    [errorCode.SYS_ERR.ENTITY_EXISTED]: 'Entity already exists',
    [errorCode.SYS_ERR.UNAUTHORIZED]: 'Authorization required',
    [errorCode.SYS_ERR.FORBIDDEN]: 'Forbidden request',
    [errorCode.SYS_ERR.NOT_FOUND]: 'Entity not found',
    [errorCode.SYS_ERR.MISSING_MIDDLEWARE]: 'Make sure to apply tenantsMiddleware',

    [errorCode.ZALO_APP_ERR.ACTIVITY_LOG_NOT_FOUND]: 'Activity log with the provided phone is not found',
    [errorCode.ZALO_APP_ERR.ELASTIC_INDEX_NOT_FOUND]: 'Index is not found',
    [errorCode.ZALO_APP_ERR.STORE_NOT_FOUND]: 'Store is not found',
    [errorCode.ZALO_APP_ERR.XYZ_CHECK_IN_OUT_DISTANCE]: 'Your location is over. Check-in/out unavailable',
    [errorCode.ZALO_APP_ERR.SESSION_EXPIRED]: 'Session expired. Check-out unavailable',
    [errorCode.ZALO_APP_ERR.CHECK_OUT_FORBIDDEN]: 'Check-in first before Check-out',
    [errorCode.ZALO_APP_ERR.INVALID_ID]: 'The provided Id is not found or has already been deleted',

};
