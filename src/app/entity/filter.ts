
export class CommonService {
    label: string;
    value: Number;
}
export class FilterValues {
    public price?: number;
    public starRating?: Number[];
    public guestRating?: Number[];
    public commonService?: CommonService[];
    public roomTypes?: Number[];

    constructor() { }

    roomTypePipe(value, filterValues) {
        if (value === undefined || filterValues.length === 0) {
            return value;
        }

        const temp2 = value.filter(el => {
            return filterValues.length === 0 ? el :
                filterValues.indexOf(el.roomType) >= 0;
        });

        // console.log(temp2);
        return temp2;
    }
    serviceTypePipe(value, commonService) {

        if (value === undefined || commonService.length === 0) {
            return value;
        }

        const temp3 = value.filter(list => commonService.length === 0 ? list :
            // list.services.every(val => filterValues.commonService.indexOf(val) >= 0)
            commonService.every(val => list.services.indexOf(val) >= 0)
        );



        console.log(temp3);

        return temp3;
    }
}
