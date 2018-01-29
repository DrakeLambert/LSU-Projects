using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Brick : MonoBehaviour {

	public static int count = 20;

	void OnCollisionEnter ()
	{
		Destroy(gameObject);
		count--;
		if (count < 1) {
			Game.Win ();
		}
	}
}
