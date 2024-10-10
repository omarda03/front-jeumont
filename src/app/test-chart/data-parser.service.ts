import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataParserService {

  parseData(rawData: string) {
    const lines = rawData.trim().split('\n');
    const parsedMainData: any = {};
    const numericDataLines: number[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(';').map(part => part.trim());
      if (index === 1) {
        // Extract the main data values
        parsedMainData.Channel = parts[0];
        parsedMainData.MD0 = parts[1];
        parsedMainData.MD1 = parts[2];
        parsedMainData.MD2 = parts[3];
        parsedMainData.MD3 = parts[4];
        parsedMainData.Scale = parts[5];
        parsedMainData.Min = parts[6];
        parsedMainData.Max = parts[7];
        parsedMainData.Trig1 = parts[8];
        parsedMainData.Trig2 = parts[9];
        parsedMainData.Trig3 = parts[10];
        parsedMainData.Trig4 = parts[11];
        parsedMainData.Trig5 = parts[12];
        parsedMainData.RemoteAddress = parts[13];
      } else if (index > 3) {
        // Extract numeric data lines
        numericDataLines.push(parseFloat(parts[0]));
      }
    });

    return { parsedMainData, numericDataLines };
  }
}
