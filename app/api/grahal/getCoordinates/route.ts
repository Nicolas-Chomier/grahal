import prisma from '@/app/functions/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	console.log('coordinates ...');
	try {
		const mapData = await prisma.appdata.findMany({
			select: {
				name: true,
				lat: true,
				lon: true,
			},
		});
		const searchBarObject = await prisma.appdata.findMany({
			select: {
				address: true,
			},
		});
		const cardInfoDatas = await prisma.appdata.findMany({
			select: {
				date: true,
				type: true,
				file_number: true,
				name: true,
				address: true,
				lat: true,
				lon: true,
			},
		});
		const rawAdress = searchBarObject.map((obj: { address: string }) => {
			return obj.address;
		});
		const address = rawAdress.filter((item) => !!item);

		const response = {
			mapData: mapData,
			searchBarData: address,
			cardInfoDatas: cardInfoDatas,
		};
		return NextResponse.json(response);
	} catch (error) {
		console.error('Prisma error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	} finally {
		await prisma.$disconnect();
	}
}
