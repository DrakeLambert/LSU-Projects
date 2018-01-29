using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Floor : MonoBehaviour {

	void OnCollisionEnter (Collision coll)
	{
		Destroy(coll.gameObject);
		Game.Lose ();
	}
}
